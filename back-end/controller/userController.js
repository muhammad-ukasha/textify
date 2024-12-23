const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
let temporaryUsers = {}; // Temporary storage for unverified users

// Send Email Function
const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Use your email provider
    auth: {
      user: process.env.EMAIL, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verify Your Email",
    text: `Your OTP for email verification is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

// User Registration Controller
const registerUser = async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;
  // console.log(firstname, lastname, email, password)
  try {
    // Validate input
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Store the user temporarily
    temporaryUsers[email] = {
      firstname,
      lastname,
      email,
      password,
      otp,
      createdAt: Date.now(),
    };
    console.log(temporaryUsers)
    await sendEmail(email, otp);

    return res
      .status(200)
      .json({ message: "OTP sent to your email for verification" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Return user details (excluding the password)
    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Verify OTP and Save User
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Check if user exists in temporary storage
    console.log(temporaryUsers[email])
    const tempUser = temporaryUsers[email];
    if (!tempUser) {
      return res.status(400).json({ message: "No user found or OTP expired" });
    }

    // Check if OTP matches
    if (tempUser.otp !== parseInt(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Save the user to the database
    const newUser = new User({
      firstname: tempUser.firstname,
      lastname: tempUser.lastname,
      email: tempUser.email,
      password: tempUser.password, // Password hashing is handled in the User model's pre-save hook
    });

    await newUser.save();

    // Remove the user from temporary storage
    delete temporaryUsers[email];

    return res
      .status(201)
      .json({
        message: "Email verified and user registered successfully",
        user: newUser,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
module.exports = { registerUser, loginUser, verifyOtp };
