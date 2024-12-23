const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

router.post('/signup' , userController.registerUser)
router.post('/sigin' , userController.loginUser)
router.post('/verifyEmail' , userController.verifyOtp)

module.exports = router