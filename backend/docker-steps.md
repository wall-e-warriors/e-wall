Docker requirements

* node
* jdk
* gradle

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
