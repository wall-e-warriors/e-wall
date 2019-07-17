package com.walle.ewall.healthcheck

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod.GET
import org.springframework.web.bind.annotation.ResponseBody

@Controller
@RequestMapping("/healthcheck")
class HealthCheckController {

    @ResponseBody
    @RequestMapping(method = [GET], produces = ["text/plain"])
    fun healthCheck(): String {
        return "Service is running"
    }
}