package com.walle.ewall.milestone

import junit.framework.Assert.assertEquals
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito
import org.mockito.MockitoAnnotations
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)

class MilestoneControllerTest {

    @Mock
    lateinit var milestoneService: MilestoneService

    @InjectMocks
    lateinit var milestoneController: MilestoneController

    @Before
    fun setUp() {
        MockitoAnnotations.initMocks(this)
    }

    @Test
    fun `should return created milestone`() {
        val milestone = Milestone("DECES34DE89", "Release 17.6", "09/08/2019")
        Mockito.`when`(milestoneService.createMilestone(milestone)).thenReturn(milestone)
        val createdMilestone = milestoneController.createMilestone(milestone)
        assertEquals(milestone.description, createdMilestone.description)
    }

    @Test
    fun `should return updated milestone`() {
        val milestone = Milestone("DECES34DE89", "Release 17.6", "16/08/2019")
        Mockito.`when`(milestoneService.updateMilestone(milestone)).thenReturn(milestone)
        val updatedMilestone = milestoneController.updateMilestone(milestone.id!!, milestone)
        assertEquals(milestone.date, updatedMilestone.date)
    }

    @Test
    fun `should return all milestone`() {
        setMockData()
        val milestones = milestoneController.getMilestones().milestones
        assertEquals(2, milestones.size)
        val firstMilestone = milestones[0]
        assertEquals("Release 17.5", firstMilestone.description)
    }

    private fun setMockData() {
        val list = ArrayList<Milestone>()
        list.add(Milestone("DECES34DES9", "Release 17.5", "17/07/2019"))
        list.add(Milestone("DECES34DE89", "Release 17.6", "16/08/2019"))
        val milestones = Milestones(list)
        Mockito.`when`(milestoneService.getMilestones()).thenReturn(milestones)
    }
}
