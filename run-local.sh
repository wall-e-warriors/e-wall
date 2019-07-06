#!/bin/bash

docker-compose build
docker-compose up

# trap ctrl-c and call interrupted()
trap interrupted INT

function interrupted() {
    docker-compose down
}