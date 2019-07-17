package com.walle.ewall.milestone

import org.springframework.stereotype.Service

@Service
class MilestoneService {

    val milestoneRepository: MilestoneRepository = MilestoneRepository()

    fun create(milestone: Milestone) {
        milestoneRepository.create(milestone)
    }

    fun update(milestone: Milestone) {
        milestoneRepository.update(milestone)
    }
}