package com.walle.ewall.milestone

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class MilestoneService {

    @Autowired
    lateinit var milestoneRepository: MilestoneRepository

    fun createMilestone(milestone: Milestone) {
        milestoneRepository.createMilestone(milestone)
    }

    fun updateMilestone(milestone: Milestone) {
        milestoneRepository.updateMilestone(milestone)
    }

    fun deleteMilestone(milestoneId: String): String {
        return milestoneRepository.deleteMilestone(milestoneId)
    }

    fun getMilestones(): Milestones {
       return Milestones(milestoneRepository.getMilestones())
    }

}