const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  attendanceStatus: {
    type: String,
    enum: ["present", "remote", "absent"],
    default: "absent",
  },
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
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled",
  },
  participants: [participantSchema], // Embedding the participant model
});

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;
