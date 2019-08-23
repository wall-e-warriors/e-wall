FROM node:alpine

ARG AVOID_CACHE=unknown

#Add git
RUN apk add --no-cache git
RUN apk add --no-cache openssh

ADD ./tmp/secrets /usr/tmp/secrets

#Clone repo
WORKDIR /usr
RUN AVOID_CACHE=${AVOID_CACHE} git clone https://github.com/wall-e-warriors/e-wall.git

#Copy Secrets
RUN mkdir -p /usr/e-wall/backend/src/main/resources/config
COPY /tmp/secrets/service-account.json /usr/e-wall/backend/src/main/resources/config/service-account.json

#Build Frontend
WORKDIR /usr/e-wall/frontend
RUN npm install
RUN npm run build

#Install java and create jar
WORKDIR /usr/e-wall/backend
RUN apk add openjdk8
RUN ls -alh /usr/e-wall/backend/src/main/resources/config
RUN ./gradlew clean bootJar

#Create new base image
FROM openjdk:latest
WORKDIR /root/

#Copy artifacts from previous stage
COPY --from=0 /usr/e-wall/backend/build/libs .

#Run jar
CMD java -jar /root/ewall-0.0.1-SNAPSHOT.jar --server.port=$PORT --spring.profiles.active=prod
