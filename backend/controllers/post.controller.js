const Post = require("../models/post.model");

const createPost = async (req, res) => {
  const {
    userId,
    userName,
    userEmail,
    title,
    category,
    desc,
    content,
    imageUrl,
  } = req.body;

  if (
    !userId ||
    !userName ||
    !userEmail ||
    !title ||
    !category ||
    !desc ||
    !content ||
    !imageUrl
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newPost = new Post({
      userId,
      userName,
      userEmail,
      title,
      category,
      desc,
      content,
      imageUrl,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Error creating post:", err);
    res
      .status(500)
      .json({ message: "Failed to create post", error: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error getting posts:", err);
    res
      .status(500)
      .json({ message: "Failed to get posts", error: err.message });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (err) {
    console.error("Error getting post:", err);
    res.status(500).json({ message: "Failed to get post", error: err.message });
  }
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const { title, category, desc, content, imageUrl } = req.body;

  if (!title || !category || !desc || !content || !imageUrl) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.title = title;
    post.category = category;
    post.desc = desc;
    post.content = content;
    post.imageUrl = imageUrl;

    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.error("Error editing post:", err);
    res.status(500).json({ message: "Failed to edit post", error: err.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res
      .status(500)
      .json({ message: "Failed to delete post", error: err.message });
  }
}

module.exports = { createPost, getAllPosts, getPostById, editPost, deletePost };
