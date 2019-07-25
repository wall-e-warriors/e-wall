package com.walle.ewall.milestone

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.PathVariable
import java.util.*


//TODO: Check RESTful patterns. URL pattern, HTTP verbs, Return values and Headers
@Controller
@RequestMapping("/milestone")
class MilestoneController {

    @Autowired
    lateinit var milestoneService: MilestoneService;

    @ResponseBody
    @RequestMapping(path = ["/create-milestone"], method = [RequestMethod.POST], produces = ["application/json"])
    fun createMilestone(@RequestBody milestone: Milestone): String {
        milestone.milestoneId = UUID.randomUUID().toString()
        milestoneService.createMilestone(milestone)
        return "Created successfully"
    }

    @ResponseBody
    @RequestMapping(path = ["/update-milestone"], method = [RequestMethod.PUT], produces = ["application/json"])
    fun updateMilestone(@RequestBody milestone: Milestone): String {
        milestoneService.updateMilestone(milestone)
        return "Updated successfully"
    }

    @ResponseBody
    @RequestMapping(path = ["{id}/delete-milestone"], method = [RequestMethod.DELETE], produces = ["application/json"])
    fun deleteMilestone(@PathVariable id: String): String {
        return milestoneService.deleteMilestone(id)
    }

    @ResponseBody
    @RequestMapping(path = ["/get-milestones"], method = [RequestMethod.GET], produces = ["application/json"])
    fun getMilestones(): Milestones {
        return milestoneService.getMilestones()
    }

}
