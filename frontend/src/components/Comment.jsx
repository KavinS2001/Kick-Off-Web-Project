import Image from "./Image";
import { useState } from "react";
import moment from "moment";
import { useUser } from "@clerk/clerk-react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { commentServices } from "../services/commentServices";

const Comment = ({
  /* userName, content, createdAt, userImageUrl */ comment,
  onDelete,
}) => {
  const { user } = useUser();
  const isOwner = user && comment.userId === user.id;

  //console.log("User:", user);
  //console.log("Comment:", comment);
  //console.log("Is Owner:", isOwner);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSave = async () => {
    try {
      const response =await commentServices.editComment(comment._id, { content: editedContent });
      toast.success("Comment updated successfully!");
      //console.log(response.data);
      comment.content = response.data.comment.content;
      setIsEditing(false); 
    } catch (err) {
      console.error("Failed to update comment:", err);
      toast.error("Failed to update comment. Please try again.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) return;

    try {
      await commentServices.deleteComment(comment._id);
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
        <div className="absolute bottom-6 right-6 flex gap-6 ">
          <button
            onClick={handleEditClick}
            className="text-customBlue hover:text-yellow-500 transition-all"
            title="Edit Comment"
          >
            <FiEdit2
              size={24}
              className="hover:scale-110 transition-transform"
            />
          </button>

          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-900 transition-all"
            title="Delete Post"
          >
            <FiTrash2
              size={24}
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
            src="userImg.jpeg"
            alt="User Profile"
            className="w-10 h-10 rounded-full object-cover"
            w="40"
          />
        )}

        <span className="font-bold text-lg">{comment.userName}</span>
        <span className="text-sm font-medium text-gray-500 ml-2">
          {moment(comment.createdAt).fromNow()}{" "}
        </span>
        <span className="text-sm font-medium text-gray-500">
          {new Date(comment.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="mt-4">
        {isEditing ? (
          <div>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows="2"
              className="w-full border p-2 rounded"
            />
            <div className="mt-4">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white font-bold rounded-full flex px-4 py-2 items-center justify-center hover:bg-customBlue transition duration-300"
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <p className="text-md text-gray-950">{comment.content}</p>
        )}
      </div>
    </div>
  );
};

export default Comment;
