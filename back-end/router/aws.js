const express = require("express");
const router = express.Router();
// const awsTranscriptController = require("../controller/awsTranscriptController.js");
const presign = require("../controller/presignurlcontroller");

router.get("/presigned-url", presign.presignUrl);

module.exports = router;
