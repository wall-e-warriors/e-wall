package com.walle.ewall.milestone

import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.ValueEventListener
import com.walle.ewall.EWallFirebase
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.util.*
import java.util.concurrent.CountDownLatch
import javax.annotation.PostConstruct
import kotlin.collections.ArrayList
import kotlin.collections.set

@Component
class MilestoneRepository {

  @Autowired
  lateinit var eWallFirebase: EWallFirebase

  lateinit var milestoneDatabaseRef: DatabaseReference

  @PostConstruct
  fun init() {
    val database = eWallFirebase.getDatabase()
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