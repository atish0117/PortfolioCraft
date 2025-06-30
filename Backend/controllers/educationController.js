import User from "../models/User.js";

/* ----------------- ADD education ----------------- */
export const addEducation = async (req, res) => {
  try {
    const userId = req.user._id;
    const education = req.body;               // { institution, degree, startYear, endYear }

    const updated = await User.findByIdAndUpdate(
      userId,
      { $push: { education } },
      { new: true }
    );

    res.json({ msg: "Education added", user: updated });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* --------------- UPDATE education ---------------- */
export const updateEducation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eduId } = req.params;             // sub‑doc _id
    const updates = req.body;                 // fields to change

    // Positional operator $[elem] for targeted update
    const updated = await User.findOneAndUpdate(
      { _id: userId, "education._id": eduId },
      { $set: { "education.$": { _id: eduId, ...updates } } },
      { new: true }
    );

    res.json({ msg: "Education updated", user: updated });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* ---------------- REMOVE education --------------- */
export const removeEducation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eduId } = req.params;

    const updated = await User.findByIdAndUpdate(
      userId,
      { $pull: { education: { _id: eduId } } },
      { new: true }
    );

    res.json({ msg: "Education removed", user: updated });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
