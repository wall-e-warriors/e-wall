FROM node:alpine

#Add git
RUN apk add --no-cache git
RUN apk add --no-cache openssh

WORKDIR /usr

#Clone repo
RUN git clone https://github.com/wall-e-warriors/e-wall.git
WORKDIR /usr/e-wall

#Create static files artifacts
WORKDIR /usr/e-wall/frontend
RUN npm install
RUN npm run build

#Install java and create jar
WORKDIR /usr/e-wall/backend
RUN apk add openjdk8
RUN ./gradlew clean bootJar

#Create new base image
FROM openjdk:latest
WORKDIR /root/

#Copy artifacts from previous stage
COPY --from=0 /usr/e-wall/backend/build/libs .

#Run jar
RUN java -jar /root/ewall-0.0.1-SNAPSHOT.jar
