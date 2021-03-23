const express = require("express");
const cors = require("cors");
const app = express();
const helmet = require("helmet");

const router = require("./routes/user");
const room = require("./routes/room");

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({ origin: "*" }));
const db = require("./config/db.config");
db();


app.use("/user", router);
app.use("/", room);

module.exports = app;
