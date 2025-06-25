import multer from "multer";

// Memory storage, file is stored in memory buffer
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
