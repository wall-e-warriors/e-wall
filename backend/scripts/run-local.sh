#!/bin/bash

gradle --version
gradle --stop
gradle build --continuous &
gradle bootRun
