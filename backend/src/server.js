const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Cuyhub API V1 is ready to use!");
});

const keepAlive = async () => {
  app.listen(PORT, async () => {
    console.log(`Listening on: http://localhost:${PORT}`);
  });
};

module.exports = keepAlive;
