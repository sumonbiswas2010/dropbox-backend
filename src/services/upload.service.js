const fs = require('fs');
const ApiError = require('../utils/ApiError');
const { File } = require('../models');

const singleFileUploader = async (data, user_id) => {
  try {
    const newFile = new File({
      title: data.originalname,
      user_id,
      key: data.filename,
      fileType: data.mimetype,
      location: data.path,
    });
    return await newFile.save();
  } catch (err) {
    throw new ApiError(0, err.message);
  }
};
const getFileByKey = async (key) => {
  try {
    console.log(key);
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
      await deleteFromLocal(file[i].key);
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
  console.log(key);
  fs.unlink(`uploads/${key}`, (err) => {
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
