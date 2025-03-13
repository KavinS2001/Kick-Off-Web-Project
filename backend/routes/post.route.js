const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  editPost,
  deletePost,
  incrementViews
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

router.put("/:id/views",incrementViews )

module.exports = router;
