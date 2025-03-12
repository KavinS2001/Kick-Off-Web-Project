import { useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useState } from "react";
import axios from "axios";
import { postService } from "../services/postService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CLOUDINARY_CLOUD_NAME = "dnhvrcls9"; 
const UPLOAD_PRESET = "KickOff"; 

const Write = () => {
  const { user } = useUser(); 
  console.log(user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "general",
    desc: "",
    content: "",
  });
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className=" flex items-center justify-center bg">
        <p className="text-xl font-bold text-center">
          You need to be signed in to write a post.
        </p>
      </div>
    );
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async () => {
    if (!image) return null;

    const imageFormData = new FormData();
    imageFormData.append("file", image);
    imageFormData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        imageFormData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed. Please try again.");
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.title || !formData.desc || !formData.content) {
      setLoading(false);
      toast.error("Please fill all the fields.");
      return;
    }

    const uploadedImageUrl = await uploadImageToCloudinary(); // Upload image
    setImageUrl(uploadedImageUrl); // Store image URL

    if (!uploadedImageUrl) {
      setLoading(false);
      toast.error("Failed to upload image. Please try again.");
      return;
    }

    const postReqBody = {
      userId: user.id,
      userName: user.fullName || user.username,
      userEmail: user.primaryEmailAddress?.emailAddress,
      title: formData.title,
      category: formData.category,
      desc: formData.desc,
      content: formData.content,
      imageUrl: uploadedImageUrl || "",
    };

    console.log("Post Request Body:", postReqBody);

    try {
      const response = await postService.createPost(postReqBody);
      if (response) {
        toast.success("Post created successfully!");
        setTimeout(() => navigate("/"), 2000); // Redirect after success
        setFormData({ title: "", category: "general", desc: "", content: "" });
        setImage(null);
        setImageUrl("");
      }
    } catch (error) {
      console.error("Post creation failed:", error);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col gap-6 mb-6 mt-4" >
        <div className="border-t-2 border-customBlue "></div> 
      <h1 className="text-xl font-bold">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        {/* Image Upload */}
        <label className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white cursor-pointer">
          Add a cover image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </label>

        {/* Show Preview */}
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-52 h-32 mt-2 rounded-lg shadow-md"
          />
        )}

        {/* Title Input */}
        <input
          className="text-2xl font-medium text-gray-500 placeholder-black bg-transparent outline-none"
          type="text"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        {/* Category Dropdown */}
        <div className="flex items-center gap-4">
          <label htmlFor="category" className="text-sm font-medium">
            Choose a category:
          </label>
          <select
            name="category"
            id="category"
            className="p-2 rounded-xl bg-white shadow-md"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="General">General</option>
            <option value="Untold Stories">Untold Stories</option>
            <option value="Tactics">Tactics</option>
            <option value="Transfers">Transfers</option>
            <option value="Legendery Matches">Legendary Matches</option>
            <option value="Rising Stars">Rising Stars</option>
          </select>
        </div>

        {/* Short Description */}
        <textarea
          className="p-4 rounded-xl bg-white shadow-md"
          name="desc"
          placeholder="Add Short Description"
          value={formData.desc}
          onChange={handleChange}
        />

        {/* Rich Text Editor */}
        <ReactQuill
          theme="snow"
          className="flex-1 rounded-xl bg-white shadow-md min-h-[300px]"
          value={formData.content}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, content: value }))
          }
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-customBlue text-white font-medium rounded-xl px-4 py-2 w-24 mb-4 transition-colors duration-300 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed mt-8 flex justify-center items-center"
        >
          {loading ? (
            <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5"></span>
          ) : (
            "Send"
          )}
        </button>
      </form>
    </div>
  );
};

export default Write;
