const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = require("../config/middleware");
const user = require("../models/User");
const User = mongoose.model("User", user);

router.get("/", async (req, res) => {
  await res.json(res.data);
});

router.post("/", async (req, res) => {
  if (req.body.name == "" || req.body.email == "" || req.body.password == "") {
    res.sendStatus(400);
    return;
  }

  try {
    let emailExist = await User.findOne({ email: req.body.email });
    if (emailExist != undefined) {
      res.statusCode = 400;
      res.json({ error: "Email já cadastrado!" });
      return;
    }
  } catch (err) {
    res.sendStatus(500);
    return;
  }

  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    res.json({ email: req.body.email });
    await newUser.save();
    return;
  } catch (err) {
    res.sendStatus(500);
    return;
  }
});

router.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  if (email != undefined) {
    const user = await User.findOne({ email });
    console.log(user);
    if (user.email === email) {
      jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWTS,
        { expiresIn: "48h" },
        (err, token) => {
          if (err) {
            res.sendStatus(400);
            res.json({ err: "Falha interna" });
            return;
          } else {
            res.json({ token });
            return;
          }
        }
      );
    } else {
      res.sendStatus(404);
      res.json({ err: "O E-mail enviado não existe na base de dados!" });
      return;
    }
  } else {
    res.sendStatus(400);
    res.send({ err: "O E-mail enviado é inválido" });
    return;
  }
});

router.delete("/delete/:email", async (req, res) => {
  const { email } = req.params;
  try {
    await User.findOneAndDelete({ email });
    res.status(200).json({
      msg: "Usuário deletado com sucesso",
    });
    return;
  } catch (error) {
    console.log(error);
    return;
  }
});

module.exports = router;
