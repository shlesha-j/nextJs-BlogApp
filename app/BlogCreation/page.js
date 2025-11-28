"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { addBlog } from "../utils/BlogApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

function BlogCreatePage() {
  const router = useRouter();
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


  const onSubmit = async (data) => {
    try {
      const file = data.photo_url[0];
      const base64Image = await toBase64(file);

      const blogData = {
        title: data.title,
        description: data.description,
        category : data.category,
        photo_url: base64Image, // send Base64 to API
        content: data.content,
        detail_photo: base64Image,
      };

      await addBlog(blogData);
      debugger
      toast.success("Blog Added Successfully");
      router.push("/Blogs");
      // alert("Blog Added Successfully");
      // reset();
    } catch (err) {
      console.error("Error adding blog:", err);
      toast.warning("Something went wrong");
    }
  };

  return (
    <div className="container blogcreation">
      <h2>Blog Creation</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grp">
          <label>Title: </label>
          <div className="input-grp">
            <input
              {...register("title", {
                required: "This field is required",
                minLength: { value: 3, message: "Min 3 characters" },
              })}
            />
            {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}
          </div>

        </div>

        <div className="form-grp">
          <label>Description: </label>
          <div className="input-grp">

            <input
              {...register("description", {
                required: "This field is required",
              })}
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description.message}</p>
            )}
          </div>

        </div>
        <div className="form-grp">
          <label>Category</label>
          <select {...register("category", {
            required: "Please select a category",
            validate: (value) =>
              value !== "select" || "Please select a valid category",
          })}
            name="category"
            id="category">
            <option value="select">Select</option>
            <option value="Art">Art</option>
            <option value="streetArt">Street Art</option>
            <option value="sculpture">Sculpture</option>
          </select>
          {errors.category && (
              <p style={{ color: "red" }}>{errors.category.message}</p>
            )}
        </div>
        <div className="form-grp">
          <label>Upload Image</label>
          <div className="input-grp">

            <input type="file" name="photo" accept="image/*"
              {...register("photo_url", {
                required: "This is required"
              })}
            />
            {errors.photo_url && (
              <p style={{ color: "red" }}>{errors.photo_url.message}</p>
            )}
          </div>
        </div>

        <div className="form-grp">
          <label>More Content</label>
          <div className="input-grp">

            <textarea rows="5" cols="50"
              {...register("content", {
                required: "This is required"
              })}></textarea>
            {errors.content && (
              <p style={{ color: "red" }}>{errors.content.message}</p>
            )}
          </div>
        </div>

        <div className="form-grp">
          <label>Upload Detail Photo</label>
          <div className="input-grp">

            <input type="file" name="photoD" accept="image/*"
              {...register("detail_photo", {
                required: "This is required"
              })}
            />
            {errors.detail_photo && (
              <p style={{ color: "red" }}>{errors.detail_photo.message}</p>
            )}
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="submitBtn">
          {isSubmitting ? "Submitting..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
}

export default BlogCreatePage;
