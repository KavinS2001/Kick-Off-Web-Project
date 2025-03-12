const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  editPost,
  deletePost,
} = require("../controllers/post.controller");

// Route to create a new post
router.post("/create", createPost);

// Route to get all posts
router.get("/getAllPosts", getAllPosts);

// Route to get a post by ID
router.get("/:id", getPostById);

// Route to update a post by ID
router.put("/:id", editPost);

// Route to delete a post by ID
router.delete("/:id", deletePost);

module.exports = router;
