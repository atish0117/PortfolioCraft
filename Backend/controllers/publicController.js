import User from "../models/User.js";

export const getPublicProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select(
      "-password -email -createdAt -updatedAt"
    );

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
