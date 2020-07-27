const mongoose = require("mongoose");
const crypto = require("crypto");
const uuid4 = require();
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    enc_password: {
      type: String,
      required: true,
    },
    salt: String,
    articles: {
      type: Array,
      default: [],
    },
  },
  {}
);

userSchema.virtual("password").set(function (password) {
  this.password = password;
  this.salt = uuidv4();
  this.enc_password = this.secure_password(password);
});

userSchema.method = {
  authenticate: function (plainPassword) {
    return this.enc_password === this.secure_password(plainPassword);
  },
  secure_password: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto
        .createHmac("sha265", this.salt)
        .update(plainPassword)
        .digest(hash);
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
