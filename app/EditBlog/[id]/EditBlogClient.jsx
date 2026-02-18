"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import axios from "axios";
import { editBlog } from "@/app/utils/BlogApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditBlogClient({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // useEffect(() => {
  //   async function fetchBlog() {
  //     const res = await axios.get(`http://localhost:4000/blogs/${id}`);
  //     const data = res.data;

  //     setValue("title", data.title);
  //     setValue("description", data.description);
  //     setValue("category", data.category);
  //     setValue("content", data.content);
  //     setValue("photo_url", data.photo_url);
  //     setValue("detail_photo", data.detail_photo);
  //     setLoading(false);
  //   }

  //   fetchBlog();
  // }, [id, setValue]);


  useEffect(() => {
  async function fetchBlog() {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      toast.error("Failed to load blog");
      return;
    }

    setValue("title", data.title);
    setValue("description", data.description);
    setValue("category", data.category);
    setValue("content", data.content);
    setValue("photo_url", data.photo_url);
    setValue("detail_photo", data.detail_photo);

    setLoading(false);
  }

  fetchBlog();
}, [id, setValue]);


  // const toBase64 = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = reject;
  //   });

  // const onSubmit = async (data) => {
  //   let updatedImage = data.photo_url;
  //   let updatedDetailImg = data.detail_photo;
  //   if (data.new_photo?.[0]) {
  //     updatedImage = await toBase64(data.new_photo[0]);
  //   }
  //   if (data.new_detailphoto?.[0]) {
  //     updatedDetailImg = await toBase64(data.new_detailphoto[0]);
  //   }

  //   const updatedData = {
  //     title: data.title,
  //     description: data.description,
  //     category: data.category,
  //     content: data.content,
  //     photo_url: updatedImage,
  //     detail_photo: updatedDetailImg,
  //   };

  //   await editBlog(id, updatedData);
  //   toast.success("Blog updated successfully!");
  //   router.push("/Blogs");
  // };



  const onSubmit = async (data) => {
    try {
      let updatedImage = data.photo_url;
      let updatedDetailImg = data.detail_photo;

      // If new main image selected
      if (data.new_photo?.[0]) {
        const file = data.new_photo[0];
        const uniqueId = Math.random().toString(36).substring(7);
        const fileName = `${Date.now()}-${uniqueId}-${file.name}`;

        const { error } = await supabase.storage
          .from("blog-images")
          .upload(fileName, file);

        if (error) throw error;

        const { data: publicUrl } = supabase.storage
          .from("blog-images")
          .getPublicUrl(fileName);

        updatedImage = publicUrl.publicUrl;
      }

      // If new detail image selected
      if (data.new_detailphoto?.[0]) {
        const file = data.new_detailphoto[0];
        const detailUniqueId = Math.random().toString(36).substring(7);
        const fileName = `${Date.now()}-${detailUniqueId}-${file.name}`;

        const { error } = await supabase.storage
          .from("blog-images")
          .upload(fileName, file);

        if (error) throw error;

        const { data: publicUrl } = supabase.storage
          .from("blog-images")
          .getPublicUrl(fileName);

        updatedDetailImg = publicUrl.publicUrl;
      }

      const updatedData = {
        title: data.title,
        description: data.description,
        category: data.category,
        content: data.content,
        photo_url: updatedImage,
        detail_photo: updatedDetailImg,
      };

      await editBlog(id, updatedData);

      toast.success("Blog updated successfully!");
      router.push("/Blogs");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };


  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <div className="container">
        <h2 className="txt-center">Edit Blog</h2>
        <div className="blogcreation">
          <form onSubmit={handleSubmit(onSubmit)}>


            <div className="form-grp">
              <label>Title</label>
              <input {...register("title", { required: true })} />
            </div>

            <div className="form-grp">
              <label>Description</label>
              <input {...register("description", { required: true })} />
            </div>
            <div className="form-grp">
              <label>Category</label>

              <select
                {...register("category", { required: true })}
              >
                <option value="">Select</option>
                <option value="Art">Art</option>
                <option value="Street Art">Street Art</option>
                <option value="Sculpture">Sculpture</option>
              </select>

              {errors.category && (
                <p style={{ color: "red" }}>This field is required</p>
              )}
            </div>


            <div className="form-grp">
              <label>Current Image</label>
              <img src={watch("photo_url")} width="160" />
            </div>

            <div className="form-grp">
              <label>Upload New Image</label>
              <input type="file" {...register("new_photo")} />
            </div>

            <div className="form-grp">
              <label>Content</label>
              <textarea rows="5" cols="50" {...register("content", { required: true })}></textarea>
            </div>
            <div className="form-grp">
              <label>Current Image</label>
              <img src={watch("detail_photo")} width="200" />
            </div>
            <div className="form-grp">
              <label>Upload Detail Image</label>
              <input type="file" {...register("new_detailphoto")} />
            </div>

            <button type="submit" className="submitBtn">{isSubmitting ? "Updating..." : "Update Blog"}</button>
          </form>
        </div>
      </div>
    </section>

  );
}
