import { storage, IDHelper } from "../config/appwrite.js";
import { InputFile } from 'node-appwrite/file';
import User from "../models/User.js";
// Upload Resume

export const uploadResume = async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ msg: 'No file received' });

    const inputFile = InputFile.fromBuffer(file.buffer, file.originalname);

    const uploaded = await storage.createFile(
      process.env.APPWRITE_BUCKET_ID,
      IDHelper.unique(),
      inputFile
    );

    const url = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${uploaded.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;

    res.json({ msg: 'Resume uploaded', url });
  } catch (err) {
    console.error('Appwrite upload error:', err.message);
    res.status(500).json({ msg: err.message });
  }
};


// Upload Profile Image
export const uploadProfileImage = async (req, res) => {
  try {

    console.log(req.file)
    const file = req.file;
    if (!file) {
      return res.status(400).json({ msg: 'No file received' });
    }

    // Basic validations (optional but recommended)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ msg: 'Only JPG, PNG or WEBP allowed' });
    }
    // 2 MB limit (adjust as you like)
    const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
    if (file.size > MAX_SIZE) {
      return res.status(400).json({ msg: 'Image too large (max 2 MB)' });
    }

    //Create InputFile from buffer
    const inputImage = InputFile.fromBuffer(file.buffer, file.originalname);

    //Upload to Appwrite Storage
    const uploaded = await storage.createFile(
      process.env.APPWRITE_BUCKET_ID,
      IDHelper.unique(),
      inputImage
    );

    //Build preview URL (you can also use `view` endpoint)
    const url =
      `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/` +
      `${uploaded.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;

    //Save URL in user document
    await User.findByIdAndUpdate(req.user._id, { profileImgUrl: url });

    res.json({ msg: 'Profile image uploaded', url });
  } catch (err) {
    console.error('Profile image upload error:', err.message);
    res.status(500).json({ msg: err.message });
  }
};
