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

