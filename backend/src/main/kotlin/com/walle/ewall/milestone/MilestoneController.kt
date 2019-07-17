package com.walle.ewall.milestone

import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody
import java.io.FileInputStream
import java.util.*
import kotlin.collections.ArrayList


//TODO: Check RESTful patterns. URL pattern, HTTP verbs, Return values and Headers
@Controller
@RequestMapping("/milestone")
class MilestoneController {

    // TODO: Injection
    var milestoneService: MilestoneService = MilestoneService()

    @ResponseBody
    @RequestMapping(path = ["/create"], method = [RequestMethod.POST], produces = ["text/plain"])
    fun create(@RequestBody milestone: Milestone): String {
        milestoneService.create(milestone)
        return "Uploaded successfully"
    }


    @ResponseBody
    @RequestMapping(path = ["/update"], method = [RequestMethod.POST], produces = ["text/plain"])
    fun update(@RequestBody milestone: Milestone): String {
        milestoneService.update(milestone)
        return "Updated successfully"
    }
}
