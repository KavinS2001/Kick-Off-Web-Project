const Comment = require("../models/comment.model");

// Create new comment
const createComment = async (req, res) => {
  const {
    postId,
    userId,
    userName,
    content,
    userImageUrl
  } = req.body;

  try {
    const newComment = new Comment({
      postId,
      userId,
      userName,
      content,
      userImageUrl
    });
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Failed to add comment", error });
  }
};

// Get all comemnts
const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Failed to fetch comments", error });
  }
};

const deleteCommentById = async (req, res) => {
  const { commentId } = req.params; // Extracts commentId from URL

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comment Deleted Successfully" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({
      message: "Failed to delete comment",
      error: err.message,
    });
  }
};


module.exports = { createComment, getCommentsByPostId, deleteCommentById };

