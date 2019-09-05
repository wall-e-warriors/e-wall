package com.walle.ewall.timeOff

import com.google.firebase.database.DatabaseReference
import com.walle.ewall.firebase.FirebaseDatabaseWrapper
import javax.annotation.PostConstruct
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
class TimeOffRepository {
  @Value("\${config.firebase.database.url}")
  lateinit var databaseUrl: String

  @Autowired
  lateinit var firebaseDatabaseWrapper: FirebaseDatabaseWrapper

  lateinit var timeOffDatabaseReference: DatabaseReference

  @PostConstruct
  fun init() {
    val database = firebaseDatabaseWrapper.getDatabase()
    timeOffDatabaseReference = database.getReference("timeOff")
  }

  fun createTimeOff(timeOff: TimeOff): TimeOff {
    val userRef: DatabaseReference = timeOffDatabaseReference.child(timeOff.id)
    userRef.setValueAsync(timeOff)
    return timeOff
  }

  fun updateTimeOff(timeOff: TimeOff): TimeOff {
    val value = HashMap<String, Any>()
    value[timeOff.id.toString()] = timeOff
    timeOffDatabaseReference.updateChildrenAsync(value)
    return timeOff
  }

  fun deleteTimeOff(timeOffId: String) {
    val userRef: DatabaseReference = timeOffDatabaseReference.child(timeOffId)
    userRef.removeValueAsync()
  }
}
