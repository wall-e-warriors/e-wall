FROM alpine:3.10

#TODO: Try Cloning source code from remote git
#Add all files available at current location
COPY . /usr/e-wall

#Set working directory
WORKDIR /usr/e-wall

#Install node
RUN apk add npm

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
