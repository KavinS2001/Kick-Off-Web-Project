const express = require("express");
const { createComment, getCommentsByPostId } = require("../controllers/comment.controller");

const router = express.Router();

// Route to create a new comment
router.post("/", createComment);

// Route to get all comments for a specific post
router.get("/:postId", getCommentsByPostId);

module.exports = router;
