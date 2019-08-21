package com.walle.ewall.milestone

import com.fasterxml.jackson.databind.type.MapType
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.google.firebase.database.DatabaseReference
import com.walle.ewall.firebase.FirebaseDatabaseWrapper
import java.net.HttpURLConnection
import java.net.URL
import javax.annotation.PostConstruct
import kotlin.collections.set
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

const val MILESTONES_DB_PATH = "milestones.json"
const val AUTH_HEADER_KEY = "Authorization"
const val AUTH_HEADER_BEARER_PREFIX = "Bearer"

@Component
class MilestoneRepository {

  @Value("\${config.firebase.database.url}")
  lateinit var databaseUrl: String

  @Autowired
  lateinit var firebaseDatabaseWrapper: FirebaseDatabaseWrapper

  lateinit var milestoneDatabaseRef: DatabaseReference

  @PostConstruct
  fun init() {
    val database = firebaseDatabaseWrapper.getDatabase()
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

  fun getMilestones(): List<Milestone> {
    val url = URL("$databaseUrl/$MILESTONES_DB_PATH")

    lateinit var milestones: List<Milestone>

    with(url.openConnection() as HttpURLConnection) {
      this.setRequestProperty(
        AUTH_HEADER_KEY,
        "$AUTH_HEADER_BEARER_PREFIX ${firebaseDatabaseWrapper.getToken()}")

      inputStream.bufferedReader().use {
        it.lines().forEach { line ->
          val mapper = jacksonObjectMapper()
          val typeFactory = mapper.typeFactory
          val mapType: MapType = typeFactory.constructMapType(Map::class.java, String::class.java, Milestone::class.java)
          val mapOfMilestones: Map<String, Milestone> = mapper.readValue(line, mapType)
          milestones = mapOfMilestones.values.toList()
        }
      }
    }

    return milestones
  }
}
