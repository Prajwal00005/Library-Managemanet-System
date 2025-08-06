import { v2 as cloudinary } from "cloudinary";

const CLOUDINARY_FOLDER = "BookNest";

const uploadFile = async (files) => {
  const uploadedResults = [];

  for (const file of files) {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: CLOUDINARY_FOLDER,
          },
          (error, data) => {
            if (error) return reject(error);
            return resolve(data);
          }
        )
        .end(file.buffer);
    });

    uploadedResults.push(result);
  }

  return uploadedResults;
};

export default uploadFile;
