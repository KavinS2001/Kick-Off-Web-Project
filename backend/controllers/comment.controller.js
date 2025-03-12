const Comment = require("../models/comment.model");

// Create a new comment
exports.createComment = async (req, res) => {
  const { postId, userId, userName, content,userImageUrl } = req.body;

  try {
    const newComment = new Comment({ postId, userId, userName, content, userImageUrl });
    await newComment.save();
    
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Failed to add comment", error });
  }
};

// Get all comments for a specific post
exports.getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Failed to fetch comments", error });
  }
};
