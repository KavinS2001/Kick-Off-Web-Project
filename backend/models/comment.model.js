const mongoose = require("mongoose");

// Define the Comment schema
const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, 
  userId: { type: String, required: true }, 
  userName: { type: String, required: true }, 
  userImageUrl:{type: String, required: true},
  content: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now, required: false }, 
});

// Create the Comment model
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
