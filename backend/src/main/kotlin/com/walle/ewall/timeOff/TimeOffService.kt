package com.walle.ewall.timeOff

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
class TimeOffService {
  @Autowired
  lateinit var timeOffRepository: TimeOffRepository

  fun createTimeOff(timeOff: TimeOff): TimeOff {
    timeOff.id = UUID.randomUUID().toString()
    return timeOffRepository.createTimeOff(timeOff)
  }

  fun updateTimeOff(timeOff: TimeOff): TimeOff {
    return timeOffRepository.updateTimeOff(timeOff)
  }

  fun deleteTimeOff(timeOffId: String) {
    timeOffRepository.deleteTimeOff(timeOffId)
  }
}