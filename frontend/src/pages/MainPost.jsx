import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns"; // For human-readable date format
import { useUser } from "@clerk/clerk-react";
import { FiEdit2, FiTrash2 } from "react-icons/fi"; // Import icons
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postService } from "../services/postService";
import Comments from "../components/Comments";
import axios from "axios";

const MainPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser(); // Get authenticated user
  const [postData, setPostData] = useState(null);

    useEffect(() => {
    if (id) {
      postService.incrementViews(id);
    }
  }, []); 
  

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

  const { title, desc, imageUrl, content, userId, userName, createdAt, views } =
    postData;

  const isOwner = user && userId === user.id; 

  // Handle post deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await postService.deletePost(id);
      toast.success("Post deleted successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Failed to delete post:", error);
      toast.error("Failed to delete post. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="border-t-2 border-customBlue mb-8 "></div>
      <div className="mb-8 relative">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>

        <p className="text-lg font-medium text-gray-600">{desc}</p>

        {isOwner && (
          <div className="absolute top-10   right-2 md:top-8 md:-right-20 flex gap-3 md:gap-5">
            <Link
              to={`/edit/${id}`}
              className="text-blue-500 hover:text-yellow-500 transition-all"
              title="Edit Post"
            >
              <FiEdit2 size={28} />
            </Link>

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

      {/*  Content */}
      <div className="prose prose-lg text-gray-800 leading-relaxed mb-6">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <div className="flex items-center justify-center mb-6 gap-16 font-extrabold text-xl bg-slate-50 text-gray-900 px-4 py-2 md:px-10 md:py-4 w-1/2 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 border-2 border-gray-300">
        <span className="text-gray-600">View Count{" "}:</span>
        <span className="ml-4 ">{Math.floor(views / 2)}</span>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-500 mt-8 border-t pt-4">
        <span className="font-medium">{userName}</span>
        <span className="italic">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </span>
      </div>
      <Comments postId={id} />
    </div>
  );
};

export default MainPost;
