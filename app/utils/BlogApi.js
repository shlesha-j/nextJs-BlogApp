import axios from "axios";

const API_URL = "http://localhost:4000/blogs";


// export const fetchBlogs = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     throw error;
//   }
// };


export const fetchBlogs = async () => {
  const res = await fetch(API_URL, {
    cache: "no-store", 
  });

  if (!res.ok) throw new Error("Failed to fetch blogs");

  return res.json();
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

export const editBlog = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error editing blog:", error);
    throw error;
  }
};
