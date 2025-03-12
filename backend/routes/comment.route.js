const express = require("express");
const { createComment, getCommentsByPostId, deleteCommentById } = require("../controllers/comment.controller");

const router = express.Router();

router.post("/", createComment);

router.get("/:postId", getCommentsByPostId);

router.delete("/:commentId", deleteCommentById)

module.exports = router;
