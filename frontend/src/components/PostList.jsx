import { useEffect, useState } from "react";
import { postService } from "../services/postService";
import PostListItem from "./PostListItem";

const PostList = ({ category, trending }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getAllPosts();

        let filteredPosts = data;

        if (category) {
          // Filter based on categorie
          filteredPosts = filteredPosts.filter(
            (post) => post.category === category
          );
        }

        if (trending) {
          // Sort desc order
          filteredPosts = filteredPosts
            .sort((a, b) => b.views - a.views)
            .slice(0, 5);
        }

        setPosts(filteredPosts);
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category, trending]);

  // Delete Post Function
  const handlePostDelete = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== deletedPostId)
    );
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading posts...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (posts.length === 0) {
    return <p className="text-center text-gray-500">No posts available.</p>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostListItem key={post._id} post={post} onDelete={handlePostDelete} />
      ))}
    </div>
  );
};

export default PostList;
