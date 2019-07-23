package com.walle.ewall.milestone

import org.springframework.stereotype.Service

@Service
class MilestoneService {

    val milestoneRepository: MilestoneRepository = MilestoneRepository()

    fun createMilestone(milestone: Milestone) {
        milestoneRepository.createMilestone(milestone)
    }

    fun updateMilestone(milestone: Milestone) {
        milestoneRepository.updateMilestone(milestone)
    }

    fun deleteMilestone(milestoneId: String): String {
        return milestoneRepository.deleteMilestone(milestoneId)
    }

    fun getMilestones(): List<Milestone> {
       return milestoneRepository.getMilestones()
    }

}