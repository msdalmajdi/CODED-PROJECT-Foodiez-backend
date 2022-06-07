const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signin = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    res.status(201).json(token);
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  const saltRounds = 10;
  try {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json(token);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.find({ username: req.user.username });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const generateToken = (user) => {
  const numOfMin = +process.env.JWT_EXP;
  const payload = {
    _id: user._id,
    username: user.username,
    // JWT_EXP is in min
    exp: Date.now() + numOfMin * 60 * 1000,
  };

  // token
  return jwt.sign(payload, process.env.JWT_SECRET);
};
