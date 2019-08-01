import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.springframework.boot.gradle.tasks.bundling.BootJar

plugins {
  id("org.springframework.boot") version "2.1.6.RELEASE"
  id("io.spring.dependency-management") version "1.0.7.RELEASE"
  kotlin("jvm") version "1.2.71"
  kotlin("plugin.spring") version "1.2.71"
}

group = "com.walle"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_1_8

repositories {
  mavenCentral()
}

dependencies {
  implementation("org.springframework.boot:spring-boot-starter-web")
  implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
  implementation("org.jetbrains.kotlin:kotlin-reflect")
  implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
  implementation("org.springframework.boot:spring-boot-devtools")
  implementation("com.google.firebase:firebase-admin:6.8.1")
  testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks {
  register<Copy>("copyFrontend") {
    from("./../frontend/build/")
    into("$buildDir/resources/main/public/")
  }

  withType<KotlinCompile> {
    kotlinOptions {
      freeCompilerArgs = listOf("-Xjsr305=strict")
      jvmTarget = "1.8"
    }
  }
}

val bootJar: BootJar by tasks
bootJar.dependsOn("copyFrontend")