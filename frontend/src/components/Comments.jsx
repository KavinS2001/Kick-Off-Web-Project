import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { commentServices } from "../services/commentServices";
import { useUser } from "@clerk/clerk-react";
import  Comment  from "./Comment"

const Comments = ({ postId }) => {
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await commentServices.getCommentsByPostId(postId);
        console.log("Fetched Comments:", response.data);
        setComments(response.data);
      } catch (error) {
        console.error("Failed to fetch comments", error);
        toast.error("Failed to load comments.");
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  // Comment Delete Function
  const handleCommentDelete = (deletedCommentId) => {
    setComments((prevComments) => prevComments.filter((comment) => comment._id !== deletedCommentId));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) {
      toast.error("Comment content cannot be empty.");
      return;
    }

    try {
      const newComment = {
        postId,
        userId: user.id,
        userName: user.fullName || user.username,
        userImageUrl: user.imageUrl,
        content: commentContent,
      };

      const response = await commentServices.addComment(newComment);
      console.log("New Comment Response:", response.data);
      setComments((prevComments) => [response.data, ...prevComments]);
      //console.log(comments)

      setCommentContent("");
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Failed to add comment", error);
      toast.error("Failed to add comment.");
    }
  };

  return (
    <div className="flex flex-col gap-8 lg:w-4/5 mb-12 mt-5">
      {/* Comment */}
      {user && (
        <form
          onSubmit={handleCommentSubmit}
          className="flex items-center justify-between gap-12 w-full"
        >
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-4 border rounded-xl"
          ></textarea>
          <button
            type="submit"
            className="bg-customBlue text-white font-bold rounded-full flex px-6 py-3 items-center justify-center hover:bg-blue-700 transition duration-300"
          >
            Send
          </button>
        </form>
      )}

      {/* Display Comments */}
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment._id}
              comment = {comment}
              onDelete = {handleCommentDelete}
/*               userName={comment.userName}
              content={comment.content}
              createdAt={comment.createdAt}
              userImageUrl ={comment.userImageUrl} */
            />
          ))
        ) : (
          <p className="text-green-900 font-bold text-2xl">No Comments</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
