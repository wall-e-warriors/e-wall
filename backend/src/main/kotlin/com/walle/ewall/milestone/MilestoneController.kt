package com.walle.ewall.milestone

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@Controller
@RequestMapping("/milestones")
class MilestoneController {

    @Autowired
    lateinit var milestoneService: MilestoneService

    @ResponseBody
    @GetMapping
    fun getMilestones(): Milestones {
        return milestoneService.getMilestones()
    }

    @ResponseBody
    @PostMapping
    fun createMilestone(@RequestBody milestone: Milestone): Milestone {
        return milestoneService.createMilestone(milestone)
    }

    @ResponseBody
    @PutMapping("/{id}")
    fun updateMilestone(
            @PathVariable id:String,
            @RequestBody milestone: Milestone): Milestone {
        return milestoneService.updateMilestone(milestone)
    }

    @ResponseBody
    @DeleteMapping("/{id}")
    fun deleteMilestone(@PathVariable id: String) {
        milestoneService.deleteMilestone(id)
    }

}