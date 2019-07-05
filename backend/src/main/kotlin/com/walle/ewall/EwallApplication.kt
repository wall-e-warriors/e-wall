package com.walle.ewall

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class EwallApplication

fun main(args: Array<String>) {
	runApplication<EwallApplication>(*args)
}
