import Image from "./Image";
import moment from "moment";

const Comment = ({ userName, content, createdAt, userImageUrl }) => {
  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <div className="flex items-center gap-4">
        {userImageUrl ? (
          <img
            src={userImageUrl}
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

        <span className="font-bold text-lg">{userName}</span>
        <span className="text-sm font-medium text-gray-500 ml-2">
          {moment(createdAt).fromNow()} {/* Time ago (e.g., 5 minutes ago) */}
        </span>
        <span className="text-sm font-medium text-gray-500">
          {new Date(createdAt).toLocaleDateString()} {/* Format date */}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-md text-gray-950">{content}</p>
      </div>
    </div>
  );
};

export default Comment;
