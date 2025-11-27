import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Read blogs
app.get("/blogs", (req, res) => {
  const blogs = JSON.parse(fs.readFileSync("data.json"));
  res.json(blogs.blogs);
});

// Add blog
app.post("/blogs", (req, res) => {
  const db = JSON.parse(fs.readFileSync("data.json"));
  db.blogs.push(req.body);
  fs.writeFileSync("data.json", JSON.stringify(db, null, 2));
  res.json(req.body);
});

// Delete blog
app.delete("/blogs/:id", (req, res) => {
  const db = JSON.parse(fs.readFileSync("data.json"));
  const updated = db.blogs.filter((b) => b.id !== req.params.id);
  db.blogs = updated;
  fs.writeFileSync("data.json", JSON.stringify(db, null, 2));
  res.json({ success: true });
});

// Edit blog
app.put("/blogs/:id", (req, res) => {
  const db = JSON.parse(fs.readFileSync("data.json"));
  const index = db.blogs.findIndex((b) => b.id === req.params.id);
  db.blogs[index] = { ...db.blogs[index], ...req.body };
  fs.writeFileSync("data.json", JSON.stringify(db, null, 2));
  res.json(db.blogs[index]);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
