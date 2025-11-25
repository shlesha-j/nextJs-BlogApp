"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { editBlog } from "@/app/utils/BlogApi";

export default function EditBlogClient({ id }) {
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    async function fetchBlog() {
      const res = await axios.get(`http://localhost:4000/blogs/${id}`);
      const data = res.data;

      setValue("title", data.title);
      setValue("description", data.description);
      setValue("content", data.content);
      setValue("photo_url", data.photo_url);

      setLoading(false);
    }

    fetchBlog();
  }, [id, setValue]);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const onSubmit = async (data) => {
    let updatedImage = data.photo_url;

    if (data.new_photo?.[0]) {
      updatedImage = await toBase64(data.new_photo[0]);
    }

    const updatedData = {
      title: data.title,
      description: data.description,
      content: data.content,
      photo_url: updatedImage,
    };

    await editBlog(id, updatedData);
    alert("Blog updated successfully!");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit Blog</h2>

      <div>
        <label>Title</label>
        <input {...register("title", { required: true })} />
      </div>

      <div>
        <label>Description</label>
        <input {...register("description", { required: true })} />
      </div>

      <div>
        <label>Current Image</label>
        <img src={watch("photo_url")} width="160" />
      </div>

      <div>
        <label>Upload New Image</label>
        <input type="file" {...register("new_photo")} />
      </div>

      <div>
        <label>Content</label>
        <textarea rows={8} {...register("content", { required: true })}></textarea>
      </div>

      <button type="submit">{isSubmitting ? "Updating..." : "Update Blog"}</button>
    </form>
  );
}
