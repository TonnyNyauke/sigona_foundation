import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

const Blog: NextPage = () => {
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
          {blogPosts.map((post) => (
            <div
              key={post.title}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={250}
                className="w-full object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-green-700 mb-4">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link href={post.link} className="text-green-700 font-semibold hover:underline">
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

const blogPosts = [
  {
    title: "Empowering Youth Through Agriculture",
    excerpt:
      "Discover how our 4K Club initiative is changing perceptions about farming and inspiring the next generation of agricultural leaders.",
    image: "/images/agriculture-blog.jpg",
    link: "/blog/empowering-youth",
  },
  {
    title: "Tree Planting Campaign Success",
    excerpt:
      "Learn about our recent tree planting campaign and how it’s contributing to environmental conservation in local communities.",
    image: "/images/tree-planting-blog.jpg",
    link: "/blog/tree-planting",
  },
  {
    title: "Climate Action in Rural Kenya",
    excerpt:
      "Find out how we’re working with rural communities to mitigate the impacts of climate change through sustainable practices.",
    image: "/images/climate-action-blog.jpg",
    link: "/blog/climate-action",
  },
];

export default Blog;
