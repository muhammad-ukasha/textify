const express = require('express')
const router = express.Router()
const signUpUser = require('./user')
const aws = require('./aws')
const dotenv = require('dotenv');

dotenv.config();

const api = process.env.API
router.use(api , signUpUser);
router.use(api , aws);


module.exports = router;
