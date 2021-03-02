const express = require("express");
const cors = require("cors");
const app = express();

const router = require("./routes/user");
const room = require("./routes/room");

const auth = require("./config/middleware");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({ origin: "*" }));
require("./config/db.config")();


app.use("/user", router);
app.use("/", room);

module.exports = app;
