FROM alpine:3.10

#Add all files available at current location
COPY . /usr/eWall

#Set working directory
WORKDIR /usr/eWall

#Install node
RUN apk add npm

#Create static files artifacts
WORKDIR /usr/eWall/frontend
RUN npm install
RUN npm run build

#Install java and create jar
WORKDIR /usr/eWall/backend
RUN apk add openjdk8
RUN ./gradlew clean bootJar

#Run jar
RUN java -jar build/libs/ewall-0.0.1-SNAPSHOT.jar

#TODO: Uninstall all unnecessary component
#TODO: Try Cloning source code from remote git
#TODO: Try using openjdk basic image(image with java support) Install node and use another lighest image to run the final jar
