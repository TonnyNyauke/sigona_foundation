import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "./Home/Header";
import Hero from "./Home/Hero";

const Home: NextPage = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      <Header />
      {/* Hero Section */}
      <Hero />

      {/* Programs Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div
                key={program.title}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition"
              >
                <Image
                  src={program.image}
                  alt={program.title}
                  width={400}
                  height={250}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <Link href={program.link} className="text-green-700 hover:underline">Learn More</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-gray-200 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactMetrics.map((metric) => (
              <div key={metric.title} className="p-6">
                <h3 className="text-4xl font-bold text-green-700 mb-2">{metric.value}</h3>
                <p className="text-gray-600">{metric.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Featured Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div
                key={story.title}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition"
              >
                <Image
                  src={story.image}
                  alt={story.title}
                  width={400}
                  height={250}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                <p className="text-gray-600 mb-4">{story.excerpt}</p>
                <Link href={story.link} className="text-green-700 hover:underline">Read More</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="bg-white py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
          <p className="text-lg mb-6">
            Be part of the change by donating, volunteering, or partnering with us.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/donate" className="bg-yellow-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-yellow-400">
              Donate Now
            </Link>
            <Link href="/volunteer" className="bg-green-700 text-white py-3 px-6 rounded-lg text-lg hover:bg-green-600">
              Volunteer
            </Link>
            <Link href="/partner" className="bg-blue-700 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-600">
              Partner with Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Sigona Thomas Foundation. All Rights Reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

const programs = [
  {
    title: "Health",
    description: "Improving access to healthcare and supporting vulnerable communities.",
    image: "/images/health.jpg",
    link: "/programs/health",
  },
  {
    title: "Climate",
    description: "Promoting sustainable practices to combat climate change.",
    image: "/images/climate.jpg",
    link: "/programs/climate",
  },
  {
    title: "Education",
    description: "Empowering future generations through education and mentorship.",
    image: "/images/education.jpg",
    link: "/programs/education",
  },
];

const impactMetrics = [
  { title: "Trees Planted", value: "50,000+" },
  { title: "Children Supported", value: "10,000+" },
  { title: "Communities Reached", value: "200+" },
];

const stories = [
  {
    title: "Empowering Youth Through Agriculture",
    excerpt: "How the 4K Club is changing perceptions about farming in Kenya.",
    image: "/images/agriculture-story.jpg",
    link: "/stories/agriculture",
  },
  {
    title: "Tree Planting Success in Homa Bay",
    excerpt: "Our journey to planting 50,000 trees and its impact on the community.",
    image: "/images/tree-planting.jpg",
    link: "/stories/tree-planting",
  },
  {
    title: "Health Programs Making a Difference",
    excerpt: "Improving access to healthcare for vulnerable communities in rural areas.",
    image: "/images/health-story.jpg",
    link: "/stories/health",
  },
];

export default Home;
