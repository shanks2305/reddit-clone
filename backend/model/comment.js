const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
  },
  msg: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
