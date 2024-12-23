const express = require('express')
const router = express.Router()
const signUpUser = require('./user')
const dotenv = require('dotenv');

dotenv.config();

const api = process.env.API
router.use(api , signUpUser);


module.exports = router;
