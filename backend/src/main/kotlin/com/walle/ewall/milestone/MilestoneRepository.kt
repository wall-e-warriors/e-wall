package com.walle.ewall.milestone

import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.database.*
import org.springframework.stereotype.Component
import org.springframework.util.ResourceUtils
import java.io.FileInputStream
import java.util.HashMap
import java.util.concurrent.CountDownLatch
import kotlin.collections.ArrayList
import kotlin.collections.List
import kotlin.collections.set

@Component
class MilestoneRepository {

    lateinit var milestoneDatabaseRef: DatabaseReference

    init {
        val serviceAccount = FileInputStream(ResourceUtils.getFile("classpath:config/service-account.json"))
        val options = FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setDatabaseUrl("https://e-wall-board.firebaseio.com/")
                .setProjectId("e-wall-board")
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

    fun createMilestone(milestone: Milestone): Milestone {
        val userRef: DatabaseReference = milestoneDatabaseRef.child(milestone.id)
        userRef.setValueAsync(milestone)
        return milestone
    }

    fun updateMilestone(milestone: Milestone): Milestone {
        val value = HashMap<String, Any>()
        value[milestone.id.toString()] = milestone
        milestoneDatabaseRef.updateChildrenAsync(value)
        return milestone
    }

    fun deleteMilestone(milestoneId: String) {
        val userRef: DatabaseReference = milestoneDatabaseRef.child(milestoneId)
        userRef.removeValueAsync()
    }

    // TODO: Get Milestones without Listener
    fun getMilestones(): List<Milestone> {
        val latch = CountDownLatch(1)

        val milestones = ArrayList<Milestone>()

        milestoneDatabaseRef.addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {
                for (data in dataSnapshot.children) {
                    val milestone = Milestone(data.child("id").value as String, data.child("description").value as String,
                            data.child("date").value as String)
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