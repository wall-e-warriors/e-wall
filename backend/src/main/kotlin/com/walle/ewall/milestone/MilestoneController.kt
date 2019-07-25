package com.walle.ewall.milestone

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.PathVariable


//TODO: Check RESTful patterns. URL pattern, HTTP verbs, Return values and Headers
@Controller
@RequestMapping("/milestone")
class MilestoneController {

    @Autowired
    lateinit var milestoneService: MilestoneService;

    @ResponseBody
    @RequestMapping(path = ["/create"], method = [RequestMethod.POST], produces = ["application/json"])
    fun createMilestone(@RequestBody milestone: Milestone): Milestone {
        return milestoneService.createMilestone(milestone)
    }

    @ResponseBody
    @RequestMapping(path = ["/update"], method = [RequestMethod.PUT], produces = ["application/json"])
    fun updateMilestone(@RequestBody milestone: Milestone): Milestone {
        return milestoneService.updateMilestone(milestone)
    }

    @ResponseBody
    @RequestMapping(path = ["{id}/delete"], method = [RequestMethod.DELETE], produces = ["application/json"])
    fun deleteMilestone(@PathVariable id: String) {
        milestoneService.deleteMilestone(id)
    }

    @ResponseBody
    @RequestMapping(path = ["/get"], method = [RequestMethod.GET], produces = ["application/json"])
    fun getMilestones(): Milestones {
        return milestoneService.getMilestones()
    }

}
