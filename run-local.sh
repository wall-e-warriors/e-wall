#!/bin/bash


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

init