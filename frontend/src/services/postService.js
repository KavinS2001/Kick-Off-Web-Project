import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const path = "/posts";

export const postService = {
  async createPost(data) {
    try {
      const response = await axios.post(`${baseUrl}${path}/create`, data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async getAllPosts() {
    try {
      const response = await axios.get(`${baseUrl}${path}/getAllPosts`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async getPost(slug) {
    try {
      const response = await axios.get(`${baseUrl}${path}/${slug}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async getPostsByCategory(category) {
    try {
      const response = await axios.get(
        `${baseUrl}${path}/category/${category}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async updatePost(slug, data) {
    try {
      const response = await axios.put(`${baseUrl}${path}/${slug}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async deletePost(id) {
    try {
      const response = await axios.delete(`${baseUrl}${path}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async getPostsByUser(userId) {
    try {
      const response = await axios.get(`${baseUrl}${path}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async getPostById(id) {
    try {
      const response = await axios.get(`${baseUrl}${path}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },


  getCommentsByPostId: async (postId) => {
    return await axios.get(`${baseUrl}/comments/${postId}`);
  },

  addComment: async (commentData) => {
    try {
      //console.log(commentData)
      const response = await axios.post(`${baseUrl}/comments`, commentData);
      //console.log(response.data);
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  deleteComment: async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/comments/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting comment:", error);
      return null; // Handle errors properly
    }
  }
  

};
