package com.walle.ewall.timeOff

import java.util.UUID
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

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
