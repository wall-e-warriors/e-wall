Docker requirements

*Install*

* node
* jdk
* gradle


*Steps*

* OpenJdK Docker image,
* Then Install NodeJS
* Install Gradle
* download code using https

Create frontend artifact
``
npm run build
``

Create fat jar
``
./gradlew clean bootJar
``

Execute Jar
``
java -jar build/libs/ewall-0.0.1-SNAPSHOT.jar
``

*** 

#Procedure

Methods to get your code inside Docker container:
 1. Using COPY or ADD command
 2. Using Volume feature
 3. Using Git

Lets try with simple COPY or ADD command
(Idea is to create docker image using local source code as a first step)

* Use openjdk as a basic image
* Install git
* Clone repo
* Set working directory
* Install node
* Create static files artifacts
* Create bootjar with static files in it in backend.
* Run jar
***
