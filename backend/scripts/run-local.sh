#!/bin/bash

./gradlew --version
./gradlew --stop
./gradlew build --continuous &
./gradlew bootRun
