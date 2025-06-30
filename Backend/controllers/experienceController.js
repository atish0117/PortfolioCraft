
import User from "../models/User.js";
// Update workExperience string (e.g., "Fresher", "2 years", etc.)
export const updateWorkExperience = async (req, res) => {
  try {
    const userId = req.user._id;
    const { workExperience } = req.body;

    if (!workExperience) {
      return res.status(400).json({ msg: "workExperience is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { workExperience },
      { new: true }
    );

    res.json({ msg: "Work experience updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Add one experience detail to the experienceDetails array
export const addExperienceDetail = async (req, res) => {
  try {
    const userId = req.user._id;
    const detail = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { experienceDetails: detail } },
      { new: true }
    );

    res.json({ msg: "Experience detail added", user: updatedUser });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Remove one experience detail by _id from the array
export const removeExperienceDetail = async (req, res) => {
  try {
    const userId = req.user._id;
    const { detailId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { experienceDetails: { _id: detailId } } },
      { new: true }
    );

    res.json({ msg: "Experience detail removed", user: updatedUser });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};