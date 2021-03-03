const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWTSecret = process.env.JWTS;

const user = require("../models/User");
const auth = require("../config/middleware");
const User = mongoose.model("User", user);

router.get("/", async (req, res) => {
 await res.json(res.data);
});

router.post("/", async (req, res) => {
  if (req.body.name == "" || req.body.email == "" || req.body.password == "") {
    res.status(400);
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
    res.status(500);
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
  } catch (err) {
    res.status(500);
  }
});


router.post("/auth", async (req, res) => {
  let { email, password } = req.body;

  if (email != undefined) {
    let user = await User.findOne({ email });
    console.log(user)
    if (user.email === email) {
        jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWTS,
          { expiresIn: "48h" },
          (err, token) => {
            if (err) {
              res.status(400);
              res.json({ err: "Falha interna" });
            } else {
              res.json({ token });
            }
          }
        );    
    } else {
      res.status(404);
      res.json({ err: "O E-mail enviado não existe na base de dados!" });
    }
  } else {
    res.status(400);
    res.send({ err: "O E-mail enviado é inválido" });
  }
});

//router.delete("/delete/:email", async (res, req) => {
//    let test = req.json()
//    console.log(test.body)
//  await User.deleteOne({ email: req.params.email });
//  res.sendStatus(200);
//});

module.exports = router;
