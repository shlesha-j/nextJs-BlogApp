import { supabase } from "@/lib/supabase";

// ✅ Fetch Blogs
export const fetchBlogs = async () => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }

  return data;
};

// ✅ Add Blog
export const addBlog = async (blog) => {
  try {
    console.log("Adding blog with data:", blog);

    const response = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "add", data: blog }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to add blog");
    }

    const result = await response.json();
    console.log("Blog added successfully");
    return result;
  } catch (err) {
    console.error("Error in addBlog:", err);
    throw err;
  }
};

// ✅ Delete Blog
// export const deleteBlog = async (id) => {
//   const { error } = await supabase
//     .from("blogs")
//     .delete()
//     .eq("id", id);

//   if (error) {
//     console.error("Error deleting blog:", error);
//     throw error;
//   }
// };

export const deleteBlog = async (id) => {
  try {
    console.log("Deleting blog with ID:", id);

    const response = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", id }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete blog");
    }

    const result = await response.json();
    console.log("Blog deleted successfully");
    return result;
  } catch (err) {
    console.error("Error in deleteBlog:", err);
    throw err;
  }
};


// ✅ Edit Blog
export const editBlog = async (id, updatedData) => {
  try {
    console.log("Updating blog with ID:", id, "Data:", updatedData);

    const response = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update", id, data: updatedData }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update blog");
    }

    const result = await response.json();
    console.log("Blog updated successfully");
    return result;
  } catch (err) {
    console.error("Error in editBlog:", err);
    throw err;
  }
};

export const fetchSingleBlog = async (id) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
};

