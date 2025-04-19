const express = require('express')
const router = express.Router()
const signUpUser = require('./user')
// const aws = require('./aws')
// const arduinoRoutes = require('./arduinoRoutes')
const dotenv = require('dotenv');
const  awsUrl = require('./aws') 
const aurdino = require('./aurdino')
dotenv.config();

const api = process.env.API
router.use(api, signUpUser);
router.use(api, awsUrl);
// router.use(api, aurdino);

module.exports = router;
