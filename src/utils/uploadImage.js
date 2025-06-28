import { storage, ID } from "../appwrite/appwriteConfig";

export const uploadImage = async (file) => {
  try {
    const uploaded = await storage.createFile(
      import.meta.env.VITE_APPWRITE_BUCKET_ID,
      ID.unique(),
      file
    );

    const url = storage.getFilePreview(
      import.meta.env.VITE_APPWRITE_BUCKET_ID,
      uploaded.$id
    );

    return { url: url.href, fileId: uploaded.$id };
  } catch (error) {
    throw new Error("Image upload failed");
  }
};
