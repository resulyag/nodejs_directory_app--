const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../models");
const { Op } = require("sequelize");


const User = db.User;


router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});


router.post("/register", async (req, res, next) => {
  const { userName, firstName, lastName, password } = req.body;

  const hashedPass = await bcrypt.hash(password, 10);

  try {
    const userToAdd = await User.create({
      userName,
      firstName,
      lastName,
      password: hashedPass,
    });
    res.json(userToAdd);
  } catch (error) {
    res.json({
      status: false,
      message: "register failed: " + error.message,
    });
  }
});


router.post("/authenticate", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const findedUser = await User.findOne({
      where: {
        userName: {
          [Op.eq]: userName,
        },
      },
    });
    if (!findedUser) {
      res.json({
        status: false,
        message: "Authentication failed, user not found.",
      });
    } else {
      const result = await bcrypt.compare(password, findedUser.password);
      if (!result) {
        res.json({
          status: false,
          message: "Authentication failed, wrong password.",
        });
      } else {
        const payload = { id: findedUser.id };
        const token = await jwt.sign(payload, process.env.API_SECRET_KEY, {
          expiresIn: 72000,
        });
        res.json({
          status: true,
          token,
        });
      }
    }
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
