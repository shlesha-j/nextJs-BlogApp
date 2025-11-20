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

  const onSubmit = async (data) => {
    try {
      await addBlog(data);
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
          <input type="file" name="photo" accept="image/*"/> 
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
}

export default BlogCreatePage;
