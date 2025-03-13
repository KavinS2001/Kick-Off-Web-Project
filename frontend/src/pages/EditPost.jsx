import { useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useState, useEffect } from "react";
import axios from "axios";
import { postService } from "../services/postService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CLOUDINARY_CLOUD_NAME = "dnaot42jf"; 
const UPLOAD_PRESET = "kickoff"; 

const EditPost = () => {
  const { user } = useUser(); 
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    title: "",
    category: "general",
    desc: "",
    content: "",
    imageUrl: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const post = await postService.getPostById(id);
        if (post) {
          setFormData({
            title: post.title,
            category: post.category,
            desc: post.desc,
            content: post.content,
            imageUrl: post.imageUrl || "",
          });
        } else {
          toast.error("Post not found!");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        toast.error("Failed to fetch post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  if (!user) {
    return (
      <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex items-center justify-center">
        <p className="text-xl font-bold text-center">
          You need to be signed in to edit a post.
        </p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const uploadImageToCloudinary = async () => {
    if (!image) return formData.imageUrl; 

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
      return formData.imageUrl;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.title || !formData.desc || !formData.content) {
      setLoading(false);
      toast.error("Please fill all the fields.");
      return;
    }

    const uploadedImageUrl = await uploadImageToCloudinary(); 

    const updatedPost = {
      title: formData.title,
      category: formData.category,
      desc: formData.desc,
      content: formData.content,
      imageUrl: uploadedImageUrl, 
    };

    console.log("Updating Post:", updatedPost);

    try {
      await postService.updatePost(id, updatedPost);
      toast.success("Post updated successfully!");
      setTimeout(() => navigate(`/`), 2000);
    } catch (error) {
      console.error("Post update failed:", error);
      toast.error("Failed to update post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col gap-6">
      <h1 className="text-xl font-bold">Edit Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <label className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white cursor-pointer">
          Change Cover Image
          <input type="file" accept="image/*" onChange={handleImageChange} hidden />
        </label>

        {image ? (
          <img src={URL.createObjectURL(image)} alt="New Preview" className="w-52 h-32 mt-2 rounded-lg shadow-md" />
        ) : (
          formData.imageUrl && (
            <img src={formData.imageUrl} alt="Current Cover" className="w-52 h-32 mt-2 rounded-lg shadow-md" />
          )
        )}

        <input
          className="text-2xl font-extrabold text-gray-900 placeholder-black bg-transparent outline-none"
          type="text"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

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

        <textarea
          className="p-4 rounded-xl bg-white shadow-md"
          name="desc"
          placeholder="Short Description"
          value={formData.desc}
          onChange={handleChange}
        />

        <ReactQuill
          theme="snow"
          className="flex-1 rounded-xl bg-white shadow-md min-h-[300px]"
          value={formData.content}
          onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-customBlue text-white font-medium rounded-xl px-4 py-2 w-24 mb-4 transition-colors duration-300 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed mt-8 flex justify-center items-center"
        >
          {loading ? (
            <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5"></span>
          ) : (
            "Update"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditPost;
