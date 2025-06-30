import { storage, ID } from "./appwrite";

export const uploadProfileImage = async (file) => {
  const bucketId = "bucketProfileImages"; // replace with your real bucket ID
  const fileId = ID.unique();
  const uploaded = await storage.createFile(bucketId, fileId, file);
  const url = storage.getFilePreview(bucketId, uploaded.$id);
  return url.href;
};

export const uploadResume = async (file) => {
  const bucketId = "bucketResumes"; // replace with your real bucket ID
  const fileId = ID.unique();
  const uploaded = await storage.createFile(bucketId, fileId, file);
  const url = storage.getFileView(bucketId, uploaded.$id);
  return url.href;
};
