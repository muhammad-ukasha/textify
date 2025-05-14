const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

router.post('/signup' , userController.registerUser)
router.post('/sigin' , userController.loginUser)
router.post('/verifyEmail' , userController.verifyOtp)
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
module.exports = router