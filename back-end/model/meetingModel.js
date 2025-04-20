const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
//   name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  meetingId: { type: String, required: true },
  organizer: { type: String, required: true },
  subject: { type: String, required: true },
//   when: { type: String, required: true },
  description: { type: String, required: true },
  participants: [participantSchema] // Embedding the participant model
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;