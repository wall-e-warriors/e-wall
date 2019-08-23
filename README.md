# e-wall

### Travis CI

[![Build Status](https://travis-ci.com/wall-e-warriors/e-wall.svg?branch=master)](https://travis-ci.com/wall-e-warriors/e-wall)

### Code Quality

[![codebeat badge](https://codebeat.co/badges/74f6cae9-faf2-4c02-9730-a44f2f51853a)](https://codebeat.co/projects/github-com-wall-e-warriors-e-wall-master)

### Running the app locally

#### Prerequisites

Docker and Docker compose. https://docs.docker.com/docker-for-mac/install/

Node foreman: To run and manage multiple process: https://github.com/strongloop/node-foreman

`npm install -g foreman`

Heroku CLI: To deploy the app to Heroku 

`brew tap heroku/brew && brew install heroku`

**Optional**

* Intellij IDE

If you use docker for development you might not need these. And that's the preferrable.

* Node & npm
* Gradle

#### Run

`sh run-local.sh` from the root

Spring boot application will run in Tomcat server @ http://localhost:8080 and a Webpack dev server will run @ http://localhost:3000

