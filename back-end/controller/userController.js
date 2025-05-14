const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
let temporaryUsers = {}; // Temporary storage for unverified users

// Send Email Function
const sendEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify Your Email",
      text: `Your OTP for email verification is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// User Registration Controller
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  console.log(firstName, lastName, email, password, confirmPassword);
  try {
    // Validate input
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
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
      firstName,
      lastName,
      email,
      password,
      otp,
      createdAt: Date.now(),
    };
    await sendEmail(email, otp);
    console.log(otp);

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
  console.log({ email: email, password: email });

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
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
console.log(temporaryUsers);
// Verify OTP and Save User
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  // console.log(email,otp)
  try {
    // Check if user exists in temporary storage

    // console.log(temporaryUsers)
    const tempUser = temporaryUsers[email];
    if (!tempUser) {
      return res.status(400).json({ message: "No user found or OTP expired" });
    }

    // Check if OTP matches
    if (tempUser.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Save the user to the database
    const newUser = new User({
      firstname: tempUser.firstName,
      lastname: tempUser.lastName,
      email: tempUser.email,
      password: tempUser.password, // Password hashing is handled in the User model's pre-save hook
    });

    await newUser.save();

    // Remove the user from temporary storage
    // delete temporaryUsers[email];

    return res.status(201).json({
      message: "Email verified and user registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // omit password
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// New: Get one user by ID
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(`Error fetching user ${id}:`, err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// New: Update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (firstName) user.firstname = firstName;
    if (lastName) user.lastname = lastName;
    if (email) user.email = email;
    if (password) user.password = password; // your model pre-save hook will hash

    await user.save();
    const safe = user.toObject();
    delete safe.password;
    res.status(200).json({ message: "User updated", user: safe });
  } catch (err) {
    console.error(`Error updating user ${id}:`, err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// New: Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error(`Error deleting user ${id}:`, err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyOtp,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

