/* eslint-disable camelcase */
/* eslint-disable no-return-await */
/* eslint-disable no-param-reassign */

const fs = require('fs');
const ApiError = require('../utils/ApiError');
const { File } = require('../models');

const singleFileUploader = async (data) => {
  try {
    console.log(data);
    const newFile = new File({
      title: data.originalname, // String is shorthand for {type: String}
      user: 1,
      key: data.filename,
      fileType: data.mimetype,
      location: data.path,
    });
    const res = await newFile.save();
    return res;
  } catch (err) {
    console.log(err);
    throw new ApiError(0, err.message);
  }
};
const getFileByKey = async (key) => {
  try {
    console.log(key);
    let file = await File.findOne({key});
    if(!file) throw new ApiError(0, 'Nothing Found')
    console.log(file);
    return file;
    const newFile = new File({
      title: data.originalname, // String is shorthand for {type: String}
      user: 1,
      key: data.filename,
      fileType: data.mimetype,
      location: data.path,
    });
    const res = await newFile.save();
    return res;
  } catch (err) {
    console.log(err);
    throw new ApiError(0, err.message);
  }
};

const uploadDocument = async (body, data, user_id) => {
  if (data.doc_type_id === '1') data.file_key = [body[0].Key, body[1].Key].toString();
  else data.file_key = body.Key;
  return await customerService.addDocument(data, user_id);
};

const singleImageUploader = async (req) => {
  // apply filter
  // resize
  return await uploadFile(req.file);
};


const deleteFromLocal = async (key) => {
  fs.unlink(`uploads/${key}`, (err) => {
    if (err) {
      throw new ApiError(4003, "File Isn't Deleted");
    } else return true;
  });
};

const uploadImageByAdmin = async (image) => {
  try {
    return await uploadFile(image.file);
  } catch (error) {
    throw new ApiError(4111, 'Cannot upload image by admin');
  }
};

const getImageByKey = async (key) => {
  try {
    return await getFileStream(key);
  } catch (error) {
    throw new ApiError(4112, `Cannot get image by ${key}`);
  }
};
const getFile = async (key) => {
  try {
    return await getFileStream(key);
  } catch (error) {
    throw new ApiError(4112, `Cannot get file by ${key}`);
  }
};
const updateImageByAdmin = async (reqBody) => {
  try {
    if (reqBody.cover_image !== undefined && reqBody.logo !== undefined) {
      const oldName = reqBody.cover_image.split('/');
      const newName = oldName[7].split('-');
      await updateImage(oldName[7], newName[1]);

      const oldName2 = reqBody.logo.split('/');
      const newName2 = oldName2[7].split('-');
      await updateImage(oldName2[7], newName2[1]);
      return { newName, newName2 };
    }
    if (reqBody.cover_image !== undefined) {
      const oldName = reqBody.cover_image.split('/');
      const newName = oldName[7].split('-');
      await updateImage(oldName[7], newName[1]);
      return { newName };
    }
    if (reqBody.logo !== undefined) {
      const oldName = reqBody.logo.split('/');
      const newName = oldName[7].split('-');
      await updateImage(oldName[7], newName[1]);
      return { newName };
    }
    if (reqBody.photo_url !== undefined) {
      const oldName = reqBody.photo_url.split('/');
      const newName = oldName[7].split('-');
      await updateImage(oldName[7], newName[1]);
      return { newName };
    }
    if (reqBody.image !== undefined) {
      const oldName = reqBody.image.split('/');
      const newName = oldName[7].split('-');
      await updateImage(oldName[7], newName[1]);
      return { newName };
    }
    if (reqBody.item_image !== undefined) {
      const oldName = reqBody.item_image.split('/');
      const newName = oldName[7].split('-');
      await updateImage(oldName[7], newName[1]);
      return { newName };
    }
    return {};
  } catch (error) {
    throw new ApiError(4113, 'Cannot update image');
  }
};

module.exports = {
  singleFileUploader,
  getFileByKey,
};
