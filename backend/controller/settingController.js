const Setting = require("../models/settingModels");

export const addSetting = (name, value) => {
  const setting = new Setting({ name, value });

  setting.save((err, res) => {
    if (err) logger.error("Error insert setting");
    if (res) {
      logger.success("Success insert setting");
      return { success: true };
    }
    return { success: false };
  });
};

export const getAllSetting = (schema = {}) => {
  Setting.find(schema, (err, res) => {
    if (err) logger.error("Error get setting");
    console.log(res);
  });
};

export const getOneSetting = (schema = {}) => {
  Setting.findOne(schema, (err, res) => {
    if (err) logger.error("Error get setting");
    console.log(res);
  });
};

export const getByIdSetting = (id) => {
  Setting.findById(id, (err, res) => {
    if (err) logger.error("Error get setting");
    console.log(res);
  });
};

export const updateSetting = (id, schema) => {
  Setting.findByIdAndUpdate(id, schema, (err, res) => {
    if (err) logger.error("Error update setting");
  });
};

export const deleteSetting = (id) => {
  Setting.findByIdAndDelete(id, (err, res) => {
    if (err) logger.error("Error delete setting");
    logger.success("Successfuly deleted");
  });
};
