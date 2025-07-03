import { storage, ID } from "../../appwrite/appwriteConfig";

export const uploadProfileImage = async (file) => {
  const bucketId = "685ba85e0026b9b324a4"; // replace with your real bucket ID
  const fileId = ID.unique();
  const uploaded = await storage.createFile(bucketId, fileId, file);
  const url = storage.getFilePreview(bucketId, uploaded.$id);
  return url.href;
};

export const uploadResume = async (file) => {
  const bucketId = "685ba85e0026b9b324a4"; // replace with your real bucket ID
  const fileId = ID.unique();
  const uploaded = await storage.createFile(bucketId, fileId, file);
  const url = storage.getFileView(bucketId, uploaded.$id);
  return url.href;
};
