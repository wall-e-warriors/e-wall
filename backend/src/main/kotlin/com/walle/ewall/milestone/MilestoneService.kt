package com.walle.ewall.milestone

import java.util.UUID
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class MilestoneService {

    @Autowired
    lateinit var milestoneRepository: MilestoneRepository

    fun createMilestone(milestone: Milestone): Milestone {
        milestone.id = UUID.randomUUID().toString()
        return milestoneRepository.createMilestone(milestone)
    }

    fun updateMilestone(milestone: Milestone): Milestone {
        return milestoneRepository.updateMilestone(milestone)
    }

    fun deleteMilestone(milestoneId: String) {
        milestoneRepository.deleteMilestone(milestoneId)
    }

    fun getMilestones(): Milestones {
        return Milestones(milestoneRepository.getMilestones())
    }
}
