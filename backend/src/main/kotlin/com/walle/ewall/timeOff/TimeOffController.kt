package com.walle.ewall.timeOff

import com.fasterxml.jackson.annotation.JsonFormat
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody

@Controller
@RequestMapping("/timeOff")
class TimeOffController {

  @Autowired
  lateinit var timeOffService: TimeOffService

  @PostMapping
  @ResponseBody
  fun createTimeOff(@RequestBody timeOff: TimeOff): TimeOff {
    return timeOffService.createTimeOff(timeOff)
  }

  @PutMapping
  @ResponseBody
  fun updateTimeOff(@RequestBody timeOff: TimeOff): TimeOff {
    return timeOffService.updateTimeOff(timeOff)
  }

  @ResponseBody
  @DeleteMapping("/{id}")
  fun deleteMilestone(@PathVariable id: String) {
    timeOffService.deleteTimeOff(id)
  }

  @ResponseBody
  @GetMapping
  fun getAllTimeOff(
    @JsonFormat(pattern = "yyyy-MM-dd")
    @RequestParam startDate: String,
    @JsonFormat(pattern = "yyyy-MM-dd")
    @RequestParam endDate: String
  ) {
    println("id $startDate")
  }

  /*@ResponseBody
  @GetMapping
  fun getAllParticipant(@RequestParam startDate: Date, @RequestParam endDate: Date, @RequestParam participants: String) {
    println("id $startDate")
  }*/
}
