import User from "../models/User.js"; 

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updateFields = req.body;

    const updated = await User.findByIdAndUpdate(userId, updateFields, { new: true });
    res.json({ msg: "Profile updated", user: updated });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

