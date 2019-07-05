package com.walle.ewall.healthcheck

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RequestMethod.GET

@Controller
@RequestMapping("/healthcheck")
class HealthCheckController {

    @ResponseBody
    @RequestMapping(method = [GET], produces = ["application/json"])
    fun healthCheck(): String {
        return "Services is running"
    }
}