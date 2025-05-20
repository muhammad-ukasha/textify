// const nodemailer = require("nodemailer");
const Meeting = require("../model/meetingModel");
const User = require("../model/userModel");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

const addMeeting = async (req, res) => {
  function generateMeetingId() {
    return Math.floor(100000000 + Math.random() * 900000000).toString(); // 9-digit string
  }
  const {
    title,
    date,
    time,
    meetingId,
    organizer,
    subject,
    description,
    participants, // array of emails
    status,
  } = req.body;
  const participantDocs = [];
  const participantsNotFound = [];
  
  for (const email of participants) {
    const user = await User.findOne({ email });
    
    if (user) {
      participantDocs.push({ user: user._id, attendanceStatus: "absent" });
    } else {
      participantsNotFound.push(email);
    }
  }
  
  // Meeting is created regardless of participant match
  const newMeeting = new Meeting({
    title,
    date,
    time,
    meetingId :meetingId || generateMeetingId(),
    organizer,
    subject,
    description,
    participants: participantDocs,
    status: status || "scheduled",
  });
  
  try { 
    const savedMeeting = await newMeeting.save();
    console.log(savedMeeting)

    // Send emails only to matched participants
    // for (const p of participantDocs) {
    //   const user = await User.findById(p.user);
    //   const mailOptions = {
    //     from: "ukasham471@gmail.com",
    //     to: user.email,
    //     subject: "Meeting Invitation: " + subject,
    //     text: `Dear ${user.firstname} ${user.lastname} ,\n\nYou are invited to a meeting on the topic: ${subject}.\n\nMeeting Title: ${title}\nDate: ${date}\nTime: ${time}\nMeeting ID: ${meetingId}\nOrganizer: ${organizer}\n\nBest regards,\nMeeting Organizer`,
    //   };

    //   try {
    //     await transporter.sendMail(mailOptions);
    //   } catch (err) {
    //     console.error("Error sending email to", user.email, ":", err);
    //   }
    // }

    return res.status(200).json({
      message: "Meeting created",
      warning: participantsNotFound.length
        ? `Some emails were not found: ${participantsNotFound.join(", ")}`
        : undefined,
      meeting: savedMeeting,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating meeting", error: err.message });
  }
};

const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().populate("participants.user", "firstname lastname email");
    res.status(200).json(meetings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching meetings", error });
  }
};
const editMeeting = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    date,
    time,
    meetingId,
    organizer,
    subject,
    description,
    status,
  } = req.body;

  try {
    const meeting = await Meeting.findById(id).populate("participants.user");

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    // Update only editable fields (exclude participants)
    meeting.title = title || meeting.title;
    meeting.date = date || meeting.date;
    meeting.time = time || meeting.time;
    meeting.meetingId = meetingId || meeting.meetingId;
    meeting.organizer = organizer || meeting.organizer;
    meeting.subject = subject || meeting.subject;
    meeting.description = description || meeting.description;
    meeting.status = status || meeting.status;

    await meeting.save();

    // Notify all participants about the update
    for (const p of meeting.participants) {
      const user = p.user;
      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Updated Meeting Details: " + meeting.subject,
        text: `Dear ${user.name},\n\nPlease note that the meeting details have been updated. Here are the new details:\n\nMeeting Title: ${meeting.title}\nDate: ${meeting.date}\nTime: ${meeting.time}\nMeeting ID: ${meeting.meetingId}\nOrganizer: ${meeting.organizer}\n\nBest regards,\nMeeting Organizer`,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (err) {
        console.error("Error sending update email to", user.email, ":", err);
      }
    }

    res
      .status(200)
      .json({ message: "Meeting updated and notifications sent", meeting });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating meeting", error: err.message });
  }
};
const updateParticipants = async (req, res) => {
  const { id } = req.params; // Meeting ID
  const { add = [], remove = [] } = req.body; // email arrays

  try {
    const meeting = await Meeting.findById(id).populate("participants.user");
    if (!meeting) return res.status(404).json({ message: "Meeting not found" });

    // === Add New Participants ===
    for (const email of add) {
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(404)
          .json({ message: `User with email ${email} not found.` });

      const alreadyExists = meeting.participants.find(
        (p) => p.user._id.toString() === user._id.toString()
      );
      if (!alreadyExists) {
        meeting.participants.push({
          user: user._id,
          attendanceStatus: "absent",
        });

        const mailOptions = {
          from: "your-email@gmail.com",
          to: user.email,
          subject: "Meeting Invitation: " + meeting.subject,
          text: `Dear ${user.name},\n\nYou have been added to a meeting:\n\nMeeting Title: ${meeting.title}\nDate: ${meeting.date}\nTime: ${meeting.time}\nMeeting ID: ${meeting.meetingId}\nOrganizer: ${meeting.organizer}\n\nBest regards,\nMeeting Organizer`,
        };

        try {
          await transporter.sendMail(mailOptions);
        } catch (err) {
          console.error(
            "Error sending invitation email to",
            user.email,
            ":",
            err
          );
        }
      }
    }

    // === Remove Participants & Notify Them ===
    const removedEmails = [];

    meeting.participants = meeting.participants.filter((p) => {
      const userEmail = p.user.email;
      if (remove.includes(userEmail)) {
        removedEmails.push(userEmail);
        return false; // exclude from participants
      }
      return true;
    });

    await meeting.save();

    // Send removal notifications
    for (const email of removedEmails) {
      const user = await User.findOne({ email });
      if (user) {
        const mailOptions = {
          from: process.env.EMAIL,
          to: user.email,
          subject: "Removed from Meeting: " + meeting.subject,
          text: `Dear ${user.name},\n\nYou have been removed from the following meeting:\n\nMeeting Title: ${meeting.title}\nDate: ${meeting.date}\nTime: ${meeting.time}\nMeeting ID: ${meeting.meetingId}\nOrganizer: ${meeting.organizer}\n\nIf this was a mistake, please contact the organizer.\n\nBest regards,\nMeeting Organizer`,
        };

        try {
          await transporter.sendMail(mailOptions);
        } catch (err) {
          console.error("Error sending removal email to", user.email, ":", err);
        }
      }
    }

    res
      .status(200)
      .json({
        message: "Participants updated (added/removed) successfully",
        meeting,
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating participants", error: err.message });
  }
};
const updateAttendance = async (req, res) => {
  const { id } = req.params;
  const { attendance } = req.body;

  try {
    const meeting = await Meeting.findById(id).populate('participants.user');
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    let updatedCount = 0;
    const notFound = [];

    attendance.forEach(({ email, status }) => {
      const participant = meeting.participants.find(p => p.user.email === email);
      if (participant) {
        participant.attendanceStatus = status;
        updatedCount++;
      } else {
        notFound.push(email);
      }
    });

    await meeting.save();

    res.status(200).json({
      message: `Attendance updated for ${updatedCount} participant(s).`,
      notFound: notFound.length ? notFound : undefined,
      meeting,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating attendance", error: err.message });
  }
};

module.exports = { addMeeting, getMeetings, editMeeting, updateParticipants ,updateAttendance};
