const mongo = require("mongoose");

module.exports = async () => {
  await mongo.connect(process.env.Database_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

mongo.connection.on("connected", () => {
  logger.success("Database Succesfuly Connected To MONGODB!!");
});
