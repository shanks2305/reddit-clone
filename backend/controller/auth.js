const User = require("../model/user");
const jwt = require("jsonwebtoken");
const ejwt = require("express-jwt");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const enc_password = await bcrypt.hash(password, salt);

  const user = new User({
    name: name,
    email: email,
    password: enc_password,
  });

  try {
    const saveUser = await user.save();
    if (saveUser) {
      return res.status(200).json({
        _id: user._id,
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: "Error while creating user",
    });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({
      error: "Invalid Email",
    });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      error: "Invalid Email",
    });
  }

  const token = await jwt.sign({ _id: user._id }, process.env.SECRET);

  return res
    .status(200)
    .json({
      message: "User Logged Inn",
      token: token,
    })
    .header("auth-token", token);
};

exports.signout = (req, res) => {
  res.json({
    message: "Successfully Signed Out",
  });
};

//Middle Ware

exports.authenticated = (req, res, next) => {
  const token = req.header("auth-token");
  if (!check) return res.status(403).json({ error: "ACCESS DENIED" });
  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
