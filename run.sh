#!/bin/bash

GO_PASS_FIREBASE_SECRET_NON_PROD="ewall/gcp/iam/e-wall-board/firebase-adminsdk-hkptn"
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
    `gopass show ${GO_PASS_FIREBASE_SECRET_NON_PROD} > "${SECRET_FOLDER}/${FIREBASE_SECRET_FILE}"`
    echo "** Running the bootRun for the app. **"
}

build_and_push_to_heroku(){
    echo "Building docker container for heroku"
    heroku container:push web -a e-wall
    echo "Shutting down the current instance"
    heroku ps:scale web=0 -a e-wall
    echo "Releasing the latest version"
    heroku container:release web -a e-wall
    echo "Scaling the instance"
    heroku ps:scale web=1 -a e-wall
}

deploy_to_heroku(){
    cleanup_tmp
    prepare_secrets
    build_and_push_to_heroku
}

deploy_to_heroku