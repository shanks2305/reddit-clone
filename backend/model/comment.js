const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
  },
  article: {
    type: ObjectId,
    ref: "Article",
  },
  msg: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
