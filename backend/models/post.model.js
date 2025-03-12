const mongoose = require("mongoose");

// Define the Post schema
const postSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // User ID (from Clerk)
  userName: { type: String, required: true }, // User's name
  userEmail: { type: String, required: true }, // User's email
  title: { type: String, required: true }, // Post title
  category: { type: String, required: true }, // Category of the post
  desc: { type: String, required: true }, // Short description of the post
  content: { type: String, required: true }, // Post content (HTML content)
  imageUrl: { type: String, required: true }, // URL of the uploaded image
  createdAt: { type: Date, default: Date.now, required: false }, // Date the post was created
});

// Create the Post model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
