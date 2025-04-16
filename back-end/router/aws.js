const express = require("express");
const router = express.Router();
const awsTranscriptController = require("../controller/awsTranscriptController.js");

router.get("/transcription/:fileName", awsTranscriptController.transcripts);

module.exports = router;
