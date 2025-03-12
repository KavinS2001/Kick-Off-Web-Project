const express = require("express");
const { createComment, getCommentsByPostId, deleteCommentById, editCommentById } = require("../controllers/comment.controller");

const router = express.Router();

router.post("/", createComment);

router.get("/:postId", getCommentsByPostId);

router.delete("/:commentId", deleteCommentById)

router.put("/:commentId", editCommentById);

module.exports = router;
