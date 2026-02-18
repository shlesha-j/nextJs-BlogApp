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
  const { data, error } = await supabase
    .from("blogs")
    .insert([blog])
    .select();

  if (error) {
    console.error("Error adding blog:", error);
    throw error;
  }

  return data;
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
  // 1️⃣ Get blog first (to get image paths)
  const { data: blog, error: fetchError } = await supabase
    .from("blogs")
    .select("photo_url, detail_photo")
    .eq("id", id)
    .single();

  if (fetchError) throw fetchError;

  // 2️⃣ Delete images from storage
  if (blog.photo_url) {
    const mainPath = blog.photo_url.split("/blog-images/")[1];
    await supabase.storage.from("blog-images").remove([mainPath]);
  }

  if (blog.detail_photo) {
    const detailPath = blog.detail_photo.split("/blog-images/")[1];
    await supabase.storage.from("blog-images").remove([detailPath]);
  }

  // 3️⃣ Delete row from DB
  const { error } = await supabase
    .from("blogs")
    .delete()
    .eq("id", id);

  if (error) throw error;
};


// ✅ Edit Blog
export const editBlog = async (id, updatedData) => {
  const { data, error } = await supabase
    .from("blogs")
    .update(updatedData)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating blog:", error);
    throw error;
  }

  return data;
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

