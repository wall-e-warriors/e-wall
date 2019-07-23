package com.walle.ewall.milestone

import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.database.*
import org.springframework.util.ResourceUtils
import java.io.FileInputStream
import java.util.HashMap
import java.util.concurrent.CountDownLatch
import kotlin.collections.ArrayList
import kotlin.collections.List
import kotlin.collections.set

class MilestoneRepository {

    private var milestoneDatabaseRef: DatabaseReference

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

        val database = FirebaseDatabase.getInstance(firebaseApp)
        milestoneDatabaseRef = database.getReference("milestones")

    }

    fun createMilestone(milestone: Milestone) {
        val userRef: DatabaseReference = milestoneDatabaseRef.child(milestone.milestoneId)
        userRef.setValueAsync(milestone)
    }

    fun updateMilestone(milestone: Milestone) {
        val value = HashMap<String, Any>()
        value[milestone.milestoneId.toString()] = milestone
        milestoneDatabaseRef.updateChildrenAsync(value)
    }

    fun deleteMilestone(milestoneId: String): String {
        val userRef: DatabaseReference = milestoneDatabaseRef.child(milestoneId)
        userRef.removeValueAsync()
        return milestoneId
    }

    fun getMilestones(): List<Milestone> {
        val latch = CountDownLatch(1)

        val milestones = ArrayList<Milestone>()

        milestoneDatabaseRef.addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {
                for (data in dataSnapshot.children) {
                    val milestone = Milestone(data.child("milestoneId").value as String, data.child("name").value as String,
                            data.child("dateOfCreation").value as String, data.child("description").value as String)
                    milestones.add(milestone)
                }

                latch.countDown()
            }

            override fun onCancelled(databaseError: DatabaseError) {
                latch.countDown()
            }
        })
        latch.await()

        return milestones

    }
}