import axios from "axios";

const API_URL = "http://localhost:4000/blogs";


export const fetchBlogs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};


export const addBlog = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error adding blog:", error);
    throw error;
  }
};


export const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

export const updateBlog = async(id) => {
  try{
    const response = await axios.put(`${API_URL}/${id}`);
    return response.data;
  }catch(err){
    console.error("Erro ")
  }
}