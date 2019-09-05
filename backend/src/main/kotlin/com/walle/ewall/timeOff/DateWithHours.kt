package com.walle.ewall.timeOff

import com.fasterxml.jackson.annotation.JsonFormat
import java.util.*

data class DateWithHours(@JsonFormat(pattern = "yyyy-MM-dd")
                         val date: Date,
                         val hour: Int)