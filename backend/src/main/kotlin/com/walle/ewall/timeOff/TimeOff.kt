package com.walle.ewall.timeOff

data class TimeOff(
  var id: String?,
  val name: String,
  val activityType: Activities,
  val startActivity: DateWithHours,
  val endActivity: DateWithHours,
  val description: String
)
