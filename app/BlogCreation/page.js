"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { addBlog } from "../utils/BlogApi";

function BlogCreatePage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });


  // const onSubmit = async (data) => {
  //   try {
  //     await addBlog(data);
  //     alert("Blog Added Successfully");
  //     reset();
  //   } catch (err) {
  //     console.error("Error adding blog:", err);
  //     alert("Something went wrong");
  //   }
  // };

  const onSubmit = async (data) => {
  try {
    // Convert selected image to Base64
    const file = data.photo_url[0];
    const base64Image = await toBase64(file);

    const blogData = {
      title: data.title,
      description: data.description,
      photo_url: base64Image, // send Base64 to API
      content: data.content,
    };

    await addBlog(blogData);

    alert("Blog Added Successfully");
    reset();
  } catch (err) {
    console.error("Error adding blog:", err);
    alert("Something went wrong");
  }
};



  return (
    <div className="container">
      <h2>Blog Creation Page</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grp">
          <label>Title: </label>
          <input
            {...register("title", {
              required: "This field is required",
              minLength: { value: 3, message: "Min 3 characters" },
            })}
          />
          {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}
        </div>

        <div className="form-grp">
          <label>Description: </label>
          <input
            {...register("description", {
              required: "This field is required",
            })}
          />
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description.message}</p>
          )}
          
        </div>
        <div className="form-grp">
          <label>Upload Image</label>
          <input type="file" name="photo" accept="image/*"
          {...register("photo_url", {
            required: "This is required"
          })}
          /> 
          {errors.photo_url && (
            <p style={{ color: "red" }}>{errors.photo_url.message}</p>
          )}
        </div>

        <div className="form-grp">
          <label>More Content</label>
          <textarea rows="10" cols="50"
          {...register("content", {
            required:"This is required"
          })}></textarea>
          {errors.content && (
            <p style={{ color: "red" }}>{errors.content.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
}

export default BlogCreatePage;
