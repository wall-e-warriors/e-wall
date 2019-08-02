package com.walle.ewall

import com.google.auth.oauth2.AccessToken
import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.database.FirebaseDatabase
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.ResourceLoader
import org.springframework.stereotype.Component
import java.io.FileNotFoundException
import java.util.*
import javax.annotation.PostConstruct

@Component
class EWallFirebase {

  @Autowired
  lateinit var resourceLoader: ResourceLoader

  lateinit var app: FirebaseApp

  @Value("\${config.firebase.database.url}")
  lateinit var databaseUrl: String

  @Value("\${config.firebase.database.projectId}")
  lateinit var projectId: String

  @PostConstruct
  fun init() {
    try {
      val options = FirebaseOptions.Builder()
          .setCredentials(getCredentials())
          .setDatabaseUrl(databaseUrl)
          .setProjectId(projectId)
          .build()

      val firebaseApps = FirebaseApp.getApps()
      if (firebaseApps != null && firebaseApps.isNotEmpty()) {
        for (app in firebaseApps) {
          if (app.name == FirebaseApp.DEFAULT_APP_NAME)
            this.app = app
        }
      } else
        this.app = FirebaseApp.initializeApp(options)
    } catch (exception: FileNotFoundException) {
    }
  }

  private fun getCredentials(): GoogleCredentials? {
    return try {
      val serviceJsonStream = resourceLoader
          .getResource("classpath:config/service-account.json").inputStream
      GoogleCredentials.fromStream(serviceJsonStream)
    } catch (exception: FileNotFoundException) {
      GoogleCredentials.create(AccessToken("mock-token", Date()))
    }
  }

  fun getDatabase(): FirebaseDatabase {
    return FirebaseDatabase.getInstance(this.app)
  }
}