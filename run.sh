#!/bin/bash

GO_PASS_FIREBASE_SECRET_NON_PROD="ewall/gcp/iam/e-wall-board/firebase-adminsdk-hkptn"
GO_PASS_FIREBASE_SECRET_PROD="ewall/gcp/iam/e-wall-prod/firebase-adminsdk-8niko"

FIREBASE_SECRET_FILE=service-account.json

_shutdown() {
  docker-compose kill
  docker-compose rm -fv
}

init(){
    docker-compose build
    docker-compose up
    # trap ctrl-c and call interrupted()
    trap _shutdown EXIT INT TERM
}

cleanup_tmp(){
    rm -rf tmp
}

prepare_secrets(){
    SECRET_FOLDER="tmp/secrets"
    echo "** Creating service key from gopass **"
    mkdir -p ${SECRET_FOLDER}
    `gopass show ${GO_PASS_FIREBASE_SECRET_PROD} > "${SECRET_FOLDER}/${FIREBASE_SECRET_FILE}"`
    echo "** Running the bootRun for the app. **"
}

build_and_push_to_heroku(){
    echo "Building docker container for heroku"
    heroku container:push web -a e-wall --arg AVOID_CACHE=`date +%s`
    echo "Shutting down the current instance"
    heroku ps:scale web=0 -a e-wall
    echo "Releasing the latest version"
    heroku container:release web -a e-wall
    echo "Scaling the instance"
    heroku ps:scale web=1 -a e-wall
}

login_to_heroku(){
    heroku login
    heroku container:login
}

deploy_to_heroku(){
    cleanup_tmp
    prepare_secrets
    build_and_push_to_heroku
}

run_app_without_docker(){
    nf -j Procfile-dev start
}

usage() {
    echo "Usage: $0 (login || deploy || local)"
    exit 1
}

CMD=${1:-}

case ${CMD} in
  login) login_to_heroku ;;
  deploy) deploy_to_heroku ;;
  local) run_app_without_docker ;;
  *) usage ;;
esac
