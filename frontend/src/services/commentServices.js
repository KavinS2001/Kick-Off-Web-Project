import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const path = "/comments";

export const commentServices = {


  async getCommentsByPostId(postId) {
    return await axios.get(`${baseUrl}${path}/${postId}`);
  },

  async addComment(commentData) {
    try {
      //console.log(commentData)
      const response = await axios.post(`${baseUrl}${path}`, commentData);
      //console.log(response.data);
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  async deleteComment(id) {
    try {
      const response = await axios.delete(`${baseUrl}${path}/${id}`);
      return response;
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  },
  async editComment(commentId, updatedData) {
    try {
      const response = await axios.put(
        `${baseUrl}${path}/${commentId}`,
        updatedData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

};

