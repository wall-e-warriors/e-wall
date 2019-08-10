package com.walle.ewall.healthcheck

import org.junit.Assert.assertEquals
import org.junit.Before
import org.junit.Test

class HealthCheckControllerTest {

    private lateinit var healthCheckController: HealthCheckController

    @Before
    fun setUp() {
        healthCheckController = HealthCheckController()
    }

    @Test
    fun `should return Service is running when tires to hit health check end point`() {
        val service = "Service is running"
        assertEquals(service, healthCheckController.healthCheck())
    }
}
