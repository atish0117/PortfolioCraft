import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register new user
export const register = async (req, res) => {
  const { fullName, email, password, username } = req.body;

  try {
    // Check karo ki email already use to nahi ho rahi
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already used hai" });
    }

    //  Agar user ne khud username bheja hai, to uska bhi check karo (unique hona chahiye)
    if (username) {
      const usernameTaken = await User.findOne({ username });
      if (usernameTaken) {
        return res.status(400).json({ msg: "Username already taken hai" });
      }
    }

    //  Password ko hash karo (encrypt)
    const hash = await bcrypt.hash(password, 10);

    //  User ka data banayein — agar username diya gaya hai to use lo, warna skip kar do
    const userData = {
      fullName,
      email,
      password: hash
    };

    if (username && username.trim() !== "") {
      userData.username = username;
    }

    //  User create karo — agar username missing hai, to mongoose hook auto-generate karega
    const newUser = await User.create(userData);

    //  JWT token banao
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    //  Token ko cookie me save karo
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // Production me true rakhna (HTTPS)
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      })
      .status(201)
      .json({
        msg: "User created successfully",
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username // yeh frontend ko dikhega
        }
      });

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
