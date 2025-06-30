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

// Update Section Settings (order + visibility)
export const updateSectionSettings = async (req, res) => {
  try {
    const userId = req.user._id;
    const { sectionOrder, visibleSections } = req.body;

    const updated = await User.findByIdAndUpdate(
      userId,
      { sectionOrder, visibleSections },
      { new: true }
    );

    res.json({ msg: "Section settings updated", user: updated });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// Add Testimonial
export const addTestimonial = async (req, res) => {
  try {
    const { name, designation, message, imageUrl } = req.body;

    const user = await User.findById(req.user._id);
    user.testimonials.push({ name, designation, message, imageUrl });

    await user.save();
    res.json({ msg: "Testimonial added", testimonials: user.testimonials });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete Testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const index = req.params.index;
    const user = await User.findById(req.user._id);

    user.testimonials.splice(index, 1);
    await user.save();

    res.json({ msg: "Testimonial deleted", testimonials: user.testimonials });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};



// Add Certification
export const addCertification = async (req, res) => {
  try {
    const { title, platform, certificateLink } = req.body;

    const user = await User.findById(req.user._id);
    user.certifications.push({ title, platform, certificateLink });

    await user.save();
    res.json({ msg: "Certification added", certifications: user.certifications });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//  Delete Certification
export const deleteCertification = async (req, res) => {
  try {
    const index = req.params.index;
    const user = await User.findById(req.user._id);

    user.certifications.splice(index, 1);
    await user.save();

    res.json({ msg: "Certification deleted", certifications: user.certifications });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


      // update templates
export const updateTemplate = async (req, res) => {
  try {
    const { selectedTemplate } = req.body;

    const validTemplates = ["minimal", "modern", "classic", "dark", "funky"];
    if (!validTemplates.includes(selectedTemplate)) {
      return res.status(400).json({ msg: "Invalid template selected" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { selectedTemplate },
      { new: true }
    );

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json({
      msg: "Template updated",
      selectedTemplate: user.selectedTemplate,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};




