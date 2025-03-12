const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  editPost,
  deletePost,
} = require("../controllers/post.controller");

// Create New Post
router.post("/create", createPost);

// Get all Posts
router.get("/getAllPosts", getAllPosts);

// Get Post by ID
router.get("/:id", getPostById);

//  Update  post 
router.put("/:id", editPost);

//  Delete a post 
router.delete("/:id", deletePost);

module.exports = router;
