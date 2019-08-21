package com.walle.ewall.firebase

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential
import com.google.auth.oauth2.AccessToken
import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.database.FirebaseDatabase
import java.io.FileNotFoundException
import java.util.Arrays
import java.util.Date
import javax.annotation.PostConstruct
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.ResourceLoader
import org.springframework.stereotype.Component

const val SERVICE_ACCOUNT_KEY_PATH = "classpath:config/service-account.json"

@Component
class FirebaseDatabaseWrapper {

  @Autowired
  lateinit var resourceLoader: ResourceLoader

  @Value("\${config.firebase.database.url}")
  lateinit var databaseUrl: String

  @Value("\${config.firebase.database.projectId}")
  lateinit var projectId: String

  lateinit var app: FirebaseApp

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
      } else {
        this.app = FirebaseApp.initializeApp(options)
      }
    } catch (exception: Throwable) {
    }
  }

  private fun getCredentials(): GoogleCredentials? {
    return try {
      GoogleCredentials.fromStream(resourceLoader
        .getResource(SERVICE_ACCOUNT_KEY_PATH)
        .inputStream)
    } catch (exception: FileNotFoundException) {
      GoogleCredentials.create(AccessToken("mock-token", Date()))
    }
  }

  fun getDatabase(): FirebaseDatabase {
    return FirebaseDatabase.getInstance(this.app)
  }

  fun getToken(): String {

    val googleCredential = GoogleCredential.fromStream(resourceLoader
      .getResource(SERVICE_ACCOUNT_KEY_PATH)
      .inputStream)

    val scoped = googleCredential.createScoped(
      Arrays.asList(
        "https://www.googleapis.com/auth/firebase.database",
        "https://www.googleapis.com/auth/userinfo.email"
      )
    )
    scoped.refreshToken()
    return scoped.accessToken
  }
}
