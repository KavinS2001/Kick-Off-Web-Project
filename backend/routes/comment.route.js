const express = require("express");
const { createComment, getCommentsByPostId } = require("../controllers/comment.controller");

const router = express.Router();


router.post("/", createComment);


router.get("/:postId", getCommentsByPostId);

module.exports = router;
