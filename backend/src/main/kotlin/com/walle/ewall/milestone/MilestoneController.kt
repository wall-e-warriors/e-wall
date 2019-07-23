package com.walle.ewall.milestone

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody
import java.util.*


//TODO: Check RESTful patterns. URL pattern, HTTP verbs, Return values and Headers
@Controller
@RequestMapping("/milestone")
class MilestoneController {

    // TODO: Injection
    var milestoneService: MilestoneService = MilestoneService()

    @ResponseBody
    @RequestMapping(path = ["/create-milestone"], method = [RequestMethod.POST], produces = ["text/plain"])
    fun createMilestone(@RequestBody milestone: Milestone): String {
        milestone.milestoneId = UUID.randomUUID().toString()
        milestoneService.createMilestone(milestone)
        return "Created successfully"
    }

    @ResponseBody
    @RequestMapping(path = ["/update-milestone"], method = [RequestMethod.POST], produces = ["text/plain"])
    fun updateMilestone(@RequestBody milestone: Milestone): String {
        milestoneService.updateMilestone(milestone)
        return "Updated successfully"
    }

    @ResponseBody
    @RequestMapping(path = ["/delete-milestone"], method = [RequestMethod.POST], produces = ["text/plain"])
    fun deleteMilestone(@RequestBody milestoneId: String): String {
        return milestoneService.deleteMilestone(milestoneId)
    }

    @ResponseBody
    @RequestMapping(path = ["/get-milestones"], method = [RequestMethod.POST], produces = ["application/json"])
    fun getMilestones(): List<Milestone> {
        return milestoneService.getMilestones()
    }

}
