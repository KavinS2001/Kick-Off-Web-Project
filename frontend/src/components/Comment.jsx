import Image from "./Image";
import moment from "moment";
import { useUser } from "@clerk/clerk-react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";
import { postService } from "../services/postService";

const Comment = ({
  /* userName, content, createdAt, userImageUrl */ comment,
  onDelete,
}) => {
  const { user } = useUser();
  const isOwner = user && comment.userId === user.id;
  console.log("User:", user);
  console.log("Comment:", comment);
  console.log("Is Owner:", isOwner);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) return;

    try {
      await postService.deleteComment(comment._id);
      toast.success("Comment deleted successfully!");
      onDelete(comment._id);
    } catch (err) {
      console.error("Failed to delete post:", err);
      toast.error("Failed to delete Comment. Please try again.");
    }
  };

  return (
    <div className="relative p-4 bg-slate-50 rounded-xl mb-8 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      {/* Only for Owner */}
      {isOwner && (
        <div className="absolute top-6 right-6">
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

      <div className="flex items-center gap-4">
        {comment.userImageUrl ? (
          <img
            src={comment.userImageUrl}
            alt="User Profile"
            className="w-10 h-10 rounded-full object-cover"
            width="40"
          />
        ) : (
          <Image
            src="userImg.jpeg" // Fallback image if userImageUrl is not available
            alt="User Profile"
            className="w-10 h-10 rounded-full object-cover"
            w="40"
          />
        )}

        <span className="font-bold text-lg">{comment.userName}</span>
        <span className="text-sm font-medium text-gray-500 ml-2">
          {moment(comment.createdAt).fromNow()}{" "}
          {/* Time ago (e.g., 5 minutes ago) */}
        </span>
        <span className="text-sm font-medium text-gray-500">
          {new Date(comment.createdAt).toLocaleDateString()} {/* Format date */}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-md text-gray-950">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
