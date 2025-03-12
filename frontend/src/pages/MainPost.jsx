import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns"; // For human-readable date format
import { useUser } from "@clerk/clerk-react";
import { FiEdit2, FiTrash2 } from "react-icons/fi"; // Import icons
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postService } from "../services/postService"; 
import Comments from "../components/Comments"

const MainPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser(); // Get authenticated user
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    
    const fetchPostData = async () => {
      try {
        const data = await postService.getPostById(id);
        setPostData(data);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    if (id) {
      fetchPostData();
    }
  }, [id]);

  if (!postData) {
    return <div>Loading...</div>;
  }

  const { title, desc, imageUrl, content, userId, userName, createdAt } = postData;

  const isOwner = user && userId === user.id; // Check if the logged-in user is the owner
 
  // Handle post deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await postService.deletePost(id);
      toast.success("Post deleted successfully!");
      navigate("/"); // Redirect to homepage after deletion
    } catch (error) {
      console.error("Failed to delete post:", error);
      toast.error("Failed to delete post. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 relative">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-lg text-gray-600">{desc}</p>

        {/* Edit & Delete Buttons (Only visible to the owner) */}
        {isOwner && (
          <div className="absolute top-10   right-2 md:top-8 md:-right-20 flex gap-3 md:gap-5">
            {/* Edit Button */}
            <Link
              to={`/edit/${id}`}
              className="text-blue-500 hover:text-yellow-500 transition-all"
              title="Edit Post"
            >
              <FiEdit2 size={28} />
            </Link>

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 transition-all"
              title="Delete Post"
            >
              <FiTrash2 size={28} />
            </button>
          </div>
        )}
      </div>

      {/* Image Section */}
      <div className="mb-6 mt-8">
        <img
          src={imageUrl}
          alt="Post Cover"
          className="w-full h-96 object-cover rounded-xl shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </div>

      {/* Blog Content */}
      <div className="prose prose-lg text-gray-800 leading-relaxed mb-6">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-500 mt-8 border-t pt-4">
        <span className="font-medium">{userName}</span>
        <span className="italic">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </span>
      </div>
      <Comments postId={id}/>
    </div>
  );
};

export default MainPost;