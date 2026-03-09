📝 Next.js Blog App

A modern Blog Application built with Next.js that supports CRUD operations, dynamic routing, form validation, dark mode, image uploads, and toast notifications. Blog data and images are stored using Supabase, providing a scalable backend solution.
🔗 Live Demo: https://next-js-blog-app-livid.vercel.app/

🚀 Features

 - ✍️ Create Blog
 -  📖 Read Blogs
 -  ✏️ Update Blog
 -  🗑️ Delete Blog
 -  🧾 Form Validation using React Hook Form
 -  🌙 Dark Mode Support
 -  🔔 Toast Notifications
 -  🖼️ Image Upload for Blogs
 -  ⚡ Dynamic Routing
 -  📱 Responsive UI
 -  🎞️ Swiper Integration for Sliders

🛠️ Tech Stack
Frontend
  -  Next.js
  -  React
  -  CSS

Libraries
  -  react-hook-form – Form validation and handling  
  -  react-toastify – Toast notifications
  -  swiper – Slider component

Backend / Database

Supabase
  - Blog Data Storage  
  - Image Storage

Deployment
  - Vercel


📂 Project Structure
nextJs-BlogApp
│
├── components        # Reusable UI components
├── pages             # Next.js pages and routing
│   ├── blog
│   │   └── [id].js   # Dynamic routing for blog pages
│
├── styles            # Global and component styles
├── utils             # Utility functions
├── public            # Static assets
│
└── supabase          # Supabase configuration

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/shlesha-j/nextJs-BlogApp.git
2️⃣ Navigate to the Project
cd nextJs-BlogApp
3️⃣ Install Dependencies
npm install
4️⃣ Setup Environment Variables

Create a .env.local file and add:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

You can get these from your Supabase Project Settings.

▶️ Run the Project
npm run dev

App will run at:
http://localhost:3000

🧾 Form Validation

This project uses React Hook Form for efficient form handling and validation.

Validation features include:

  -  Required field validation  
  -  Error handling  
  -  Optimized re-rendering  
  -  Easy form state management

🌙 Dark Mode
The application supports Dark Mode toggle, allowing users to switch between light and dark themes for better accessibility and user experience.

⭐ Support
If you like this project, please consider giving it a star ⭐ on GitHub.
