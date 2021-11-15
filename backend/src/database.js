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

mongo.connection.on("error", (err) => {
  logger.error("Connection Error: ", err);
});

mongo.connection.on("disconnect", () => {
  logger.error("Connection disconnect");
});
