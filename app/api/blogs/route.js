import { supabase } from "@/lib/supabase";

// Handle POST (for adding blogs) and PATCH (for updating blogs)
export async function POST(request) {
  try {
    const body = await request.json();
    const { action, id, data } = body;

    if (action === "add") {
      console.log("API: Adding blog with data:", data);
      
      const { data: insertedData, error } = await supabase
        .from("blogs")
        .insert([data])
        .select();

      if (error) {
        console.error("API: Insert error:", error);
        throw error;
      }
      
      console.log("API: Blog added:", insertedData);
      return Response.json({ success: true, data: insertedData }, { status: 201 });
    }

    if (action === "update") {
      console.log("API: Updating blog ID:", id, "with data:", data);
      
      const { data: updatedData, error } = await supabase
        .from("blogs")
        .update(data)
        .eq("id", parseInt(id))
        .select();

      if (error) {
        console.error("API: Update error:", error);
        throw error;
      }
      
      console.log("API: Blog updated:", updatedData);
      return Response.json({ success: true, data: updatedData }, { status: 200 });
    }

    if (action === "delete") {
      console.log("API: Deleting blog ID:", id);
      
      // First get the blog to get image paths
      const { data: blog, error: fetchError } = await supabase
        .from("blogs")
        .select("photo_url, detail_photo")
        .eq("id", parseInt(id))
        .single();

      if (fetchError) throw fetchError;

      // Delete images from storage
      if (blog.photo_url) {
        const mainPath = blog.photo_url.split("/blog-images/")[1];
        await supabase.storage.from("blog-images").remove([mainPath]);
      }

      if (blog.detail_photo) {
        const detailPath = blog.detail_photo.split("/blog-images/")[1];
        await supabase.storage.from("blog-images").remove([detailPath]);
      }

      // Delete from database
      const { error } = await supabase
        .from("blogs")
        .delete()
        .eq("id", parseInt(id));

      if (error) throw error;
      
      return Response.json({ success: true }, { status: 200 });
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("API error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
