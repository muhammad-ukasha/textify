const express = require('express')
const router = express.Router()
const meetingcontroller = require('../controller/meetingcontroller')

router.post('/addmeeting' , meetingcontroller.addMeeting)
router.get('/list-meeting' , meetingcontroller.getMeetings)

module.exports = router