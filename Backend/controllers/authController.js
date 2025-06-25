import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  const { fullName, email, password, username } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "Email already used" });

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ fullName, email, username, password: hash });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res
      .cookie("token", token, { httpOnly: true, secure: false, sameSite: "Lax", maxAge: 7 * 86400000 })
      .status(201)
      .json({ msg: "User created", user: { id: newUser._id, fullName } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res
      .cookie("token", token, { httpOnly: true, secure: false, sameSite: "Lax", maxAge: 7 * 86400000 })
      .json({ msg: "Login success", user: { id: user._id, fullName: user.fullName } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get Current User Controller
export const getCurrentUser = (req, res) => {
  if (!req.user) return res.status(401).json({ msg: "Unauthorized" });
  res.json(req.user);
};



// Logout
export const logout = (req, res) => {
  res.clearCookie("token").json({ msg: "Logged out" });
};
