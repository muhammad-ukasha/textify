const nodemailer = require("nodemailer");
const Meeting = require("../model/meetingModel");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const addMeeting = async (req, res) => {
  const {
    title,
    date,
    time,
    meetingId,
    organizer,
    subject,
    // when,
    description,
    participants,
  } = req.body;

  // Create a new meeting document
  const newMeeting = new Meeting({
    title,
    date,
    time,
    meetingId,
    organizer,
    subject,
    // when,
    description,
    participants,
  });

  try {
    // Save the meeting
    const savedMeeting = await newMeeting.save();

    // Send invitation email to each participant
    participants.forEach(async (participant) => {
      const mailOptions = {
        from: "your-email@gmail.com",
        to: participant.email,
        subject: "Meeting Invitation: " + subject,
        text: `Dear ${participant.name},\n\nYou are invited to a meeting on the topic: ${subject}. Here are the details:\n\nMeeting Title: ${title}\nDate: ${date}\nTime: ${time}\nMeeting ID: ${meetingId}\nOrganizer: ${organizer}\n\nBest regards,\nMeeting Organizer`,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (err) {
        console.error("Error sending email:", err);
      }
    });

    res.status(200).json({
      message: "Meeting created and invitations sent successfully!",
      meeting: savedMeeting,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating meeting", error: err });
  }
};
const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.status(200).json(meetings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching meetings", error });
  }
};
module.exports = { addMeeting, getMeetings };
