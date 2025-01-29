'use client';

import { useState } from "react";
import { format } from "date-fns";
import ArticlesPage from "./ArticlesPage";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState(mockBlogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [newBlog, setNewBlog] = useState({ title: "", content: "", publishedAt: "" });

  const handleDelete = (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this blog post?");
    if (confirmed) {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBlog.title && newBlog.content && newBlog.publishedAt) {
      const newBlogData = {
        id: (blogs.length + 1).toString(),
        ...newBlog,
      };
      setBlogs([...blogs, newBlogData]);
      setNewBlog({ title: "", content: "", publishedAt: "" });
    } else {
      alert("Please fill in all fields to add a new blog post.");
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-green-700 text-white py-4 px-6">
        <h1 className="text-xl font-bold">Blog Management</h1>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Manage Blog Posts</h2>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by blog title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-left">
                <th className="py-3 px-6">Title</th>
                <th className="py-3 px-6">Content</th>
                <th className="py-3 px-6">Published Date</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog) => (
                <tr key={blog.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{blog.title}</td>
                  <td className="py-3 px-6 truncate max-w-md">{blog.content}</td>
                  <td className="py-3 px-6">{format(new Date(blog.publishedAt), "dd MMM yyyy")}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Blog Form */}
        <ArticlesPage />
      </main>
    </div>
  );
};

const mockBlogs = [
  {
    id: "1",
    title: "Empowering Youth Through Agriculture",
    content: "Discover how the 4K Club is inspiring the next generation of agricultural leaders.",
    publishedAt: "2025-01-15",
  },
  {
    id: "2",
    title: "Tree Planting Campaign Success",
    content: "Learn about our recent tree-planting initiatives and their impact on local communities.",
    publishedAt: "2025-01-20",
  },
  {
    id: "3",
    title: "Climate Action Workshop Highlights",
    content: "Key takeaways from our recent workshop focused on sustainable climate practices.",
    publishedAt: "2025-01-25",
  },
];

export default BlogManagement;
