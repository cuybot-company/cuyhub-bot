const Message = require("../models/messageModels");

export const addMessage = (name, value) => {
  const message = new Message({ name, value });

  message.save((err, res) => {
    if (err) logger.error("Error insert message");
    if (res) {
      logger.success("Success insert message");
      return { success: true };
    }
    return { success: false };
  });
};

export const getAllMessage = (schema = {}) => {
  Message.find(schema, (err, res) => {
    if (err) logger.error("Error get message");
    console.log(res);
  });
};

export const getOneMessage = (schema = {}) => {
  Message.findOne(schema, (err, res) => {
    if (err) logger.error("Error get message");
    console.log(res);
  });
};

export const getByIdMessage = (id) => {
  Message.findById(id, (err, res) => {
    if (err) logger.error("Error get message");
    console.log(res);
  });
};

export const updateMessage = (id, schema) => {
  Message.findByIdAndUpdate(id, schema, (err, res) => {
    if (err) logger.error("Error update message");
    logger.success("Successfuly updated");
  });
};

export const deleteMessage = (id, schema) => {
  Message.findByIdAndDelete(id, (err, res) => {
    if (err) logger.error("Error delete message");
    logger.success("Successfuly deleted");
  });
};
