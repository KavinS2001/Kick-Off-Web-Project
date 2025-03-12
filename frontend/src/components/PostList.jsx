import { useEffect, useState } from "react";
import { postService } from "../services/postService";
import PostListItem from "./PostListItem";

const PostList = ({ category }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getAllPosts();
        setPosts(data);
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  //Delete Post Function
  const handlePostDelete = (deletedPostId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== deletedPostId));
  };

  const filteredPosts = category
    ? posts.filter((post) => post.category === category)
    : posts;

  if (loading) {
    return <p className="text-center text-gray-600">Loading posts...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (filteredPosts.length === 0) {
    return <p className="text-center text-gray-500">No posts available.</p>;
  }


  return (
    <div className="space-y-6">
      {filteredPosts.map((post) => (
        <PostListItem key={post._id} post={post} onDelete={handlePostDelete} />
      ))}
    </div>
  );
};

export default PostList;
