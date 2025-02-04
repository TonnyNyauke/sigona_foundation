'use client'
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { useEffect, useState } from "react";
import { getBlogs } from "./blogs";
import { Blogs } from "./types";

const Blog: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [blogs, setBlogs] = useState<Blogs[]>([])
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
      const fetchBlogs = async () => {
        try {
          setIsLoading(true);
          const blogsData = await getBlogs();
          console.log(blogsData)
          setBlogs(blogsData);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Failed to fetch events');
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchBlogs();
    }, []);
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
        <Header />
      <header className="bg-green-700 text-white py-8 text-center mt-12">
        <h1 className="text-4xl font-bold">Blog & Updates</h1>
        <p className="mt-2">
          Stay informed with the latest stories, news, and updates from the Sigona Thomas Foundation.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <div
              key={post.title}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
            >
              <Image
                src={post.featured_image_url}
                alt={post.title}
                width={400}
                height={250}
                className="w-full object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-green-700 mb-4">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <Link href={`blog/${post.id}`} className="text-green-700 font-semibold hover:underline">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
