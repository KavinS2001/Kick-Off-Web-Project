const mongoose = require("mongoose");

// Define the Post schema
const postSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // from clerk
  userName: { type: String, required: true }, // from clerk
  userEmail: { type: String, required: true }, // from clerk
  title: { type: String, required: true }, 
  category: { type: String, required: true }, 
  desc: { type: String, required: true }, 
  content: { type: String, required: true }, 
  views: { type: Number, default: 0, require:true },
  imageUrl: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now, required: false }, 
});


const Post = mongoose.model("Post", postSchema);

module.exports = Post;
