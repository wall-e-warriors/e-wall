package com.walle.ewall.milestone

import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import org.springframework.util.ResourceUtils
import java.io.FileInputStream
import java.util.HashMap

class MilestoneRepository {

    private var ref: DatabaseReference

    init {
        val serviceAccount = FileInputStream(ResourceUtils.getFile("classpath:config/service-account.json"))
        val options = FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setDatabaseUrl("https://e-wall-cba9f.firebaseio.com")
                .setProjectId("e-wall-cba9f")
                .build()

        var firebaseApp: FirebaseApp? = null
        val firebaseApps = FirebaseApp.getApps()
        if (firebaseApps != null && !firebaseApps.isEmpty()) {
            for (app in firebaseApps) {
                if (app.name == FirebaseApp.DEFAULT_APP_NAME)
                    firebaseApp = app
            }
        } else
            firebaseApp = FirebaseApp.initializeApp(options)


        val defaultDatabase = FirebaseDatabase.getInstance(firebaseApp)
        ref = defaultDatabase.getReference("e-wall")

    }

    fun create(milestone: Milestone) {
        val userRef: DatabaseReference = ref.child(milestone.name)
        userRef.setValueAsync(milestone)
    }

    fun update(milestone: Milestone) {
        val userRef = ref.child(milestone.name)
        val value = HashMap<String, Any>()
        value[milestone.name] = milestone
        userRef.updateChildrenAsync(value)
    }
}