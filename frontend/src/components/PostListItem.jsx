import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import { useUser } from "@clerk/clerk-react";
import { FiEdit2, FiTrash2 } from "react-icons/fi"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postService } from "../services/postService";

const PostListItem = ({ post, onDelete }) => {
  const { user } = useUser(); 
  const isOwner = user && post.userId === user.id; 


  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await postService.deletePost(post._id);
      toast.success("Post deleted successfully!");
      onDelete(post._id); 
    } catch (error) {
      console.error("Failed to delete post:", error);
      toast.error("Failed to delete post. Please try again.");
    }
  };

  return (
    <div className="relative flex gap-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      {/* Only for Owner */}
      {isOwner && (
        <div className="absolute bottom-6 right-6 flex gap-12">
          {/* Edit Button */}
          <Link
            to={`/edit/${post._id}`}
            className="text-customBlue hover:text-yellow-500 transition-all"
            title="Edit Post"
          >
            <FiEdit2
              size={32}
              className="hover:scale-110 transition-transform"
            />
          </Link>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-900 transition-all"
            title="Delete Post"
          >
            <FiTrash2
              size={32}
              className="hover:scale-110 transition-transform"
            />
          </button>
        </div>
      )}

      <div className="w-1/3 relative group">
        <Link to={`/${post._id}`}>
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full max-h-96 object-center rounded-lg transition-transform duration-300 group-hover:scale-105 shadow-md"
          />
        </Link>
      </div>

      {/* Post Content */}
      <div className="w-2/3 flex flex-col justify-between">
        <h2 className="text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
          <Link to={`/${post._id}`}>{post.title}</Link>
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Written by{" "}
          <span className="font-semibold text-blue-700">{post.userName}</span>{" "}
          on {moment(post.createdAt).format("Do MMMM YYYY")}
        </p>


        <p className="text-gray-900 font-medium text-xl">
          {post.desc}
        </p>
        <div
          className="text-gray-500  mt-3 line-clamp-6 overflow-hidden"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Read More Button */}
        <Link
          to={`/${post._id}`}
          className="mt-4 self-start px-4 py-2 text-sm font-bold text-white bg-customBlue rounded-lg shadow-md hover:bg-blue-700 transition-all hover:scale-105"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

// Define the expected Prop
PostListItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired, 
};

export default PostListItem;
