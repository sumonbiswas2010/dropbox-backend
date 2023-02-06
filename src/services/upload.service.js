const fs = require('fs');
const ApiError = require('../utils/ApiError');
const { File } = require('../models');
const { Storage } = require('@google-cloud/storage');
const gcsKey = JSON.parse(
  Buffer.from(process.env.GCP_CRED, 'base64').toString()
);

const gcs = new Storage({
  credentials: {
    client_email: gcsKey.client_email,
    private_key: gcsKey.private_key
  },
  projectId: gcsKey.project_id
});

const bucket = gcs.bucket(process.env.GCLOUD_STORAGE_BUCKET);
const googleFileUploader = async (path) => {
  try {
    const d = await bucket.upload(path);
    return d[0].id;
    // Create a new blob in the bucket and upload the file data.
  } catch (err) {
    throw new ApiError(0, err.message);
  }
};
const singleFileUploader = async (data, user_id) => {
  try {
    const locationKey = await googleFileUploader(data.path);
    const newFile = new File({
      title: data.originalname,
      user_id,
      key: locationKey,
      fileType: data.mimetype,
      location: 'https://storage.googleapis.com/dropbox-sumon/' + locationKey,
    });
    deleteFromLocal(data.filename);
    return await newFile.save();
  } catch (err) {
    throw new ApiError(0, err.message);
  }
};
const getFileByKey = async (key) => {
  try {
    let file = await File.findOne({ key });
    if (!file) throw new ApiError(0, 'Nothing Found');
    return file;
  } catch (err) {
    throw new ApiError(0, err.message);
  }
};
const getAllFileInfo = async (user_id) => {
  try {
    return await File.find({ user_id }, { location: 0, user: 0 }).exec();
  } catch (err) {
    throw new ApiError(0, err.message);
  }
};
const deleteFilesByKey = async (keys, user_id) => {
  try {
    const file = await File.find({ key: { $in: keys }, user_id });
    const files = await File.deleteMany({ key: { $in: keys }, user_id }).exec();
    for (let i = 0; i < file.length; i++) {
      await bucket.file(file[i].key).delete();
    }
    return files;
  } catch (err) {
    throw new ApiError(0, err.message);
  }
};
const updateFileByKey = async (key, data, user_id) => {
  try {
    return await File.update({ key: key, user_id }, { isStarred: data.isStarred, updatedAt: new Date() }).exec();
  } catch (err) {
    throw new ApiError(0, err.message);
  }
};

const deleteFromLocal = async (key) => {
  fs.unlink(`/tmp/${key}`, (err) => {
    if (err) {
      throw new ApiError(4003, "File Isn't Deleted");
    } else return true;
  });
};

module.exports = {
  singleFileUploader,
  getFileByKey,
  getAllFileInfo,
  deleteFilesByKey,
  updateFileByKey,
};
