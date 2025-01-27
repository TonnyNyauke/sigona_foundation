import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

const Programs: NextPage = () => {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen mt-12">
        <Header />
      <header className="bg-green-700 text-white py-8 text-center">
        <h1 className="text-4xl font-bold">Our Programs</h1>
        <p className="mt-2">Explore the initiatives driving change in our communities.</p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.title}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
            >
              <Image
                src={program.image}
                alt={program.title}
                width={400}
                height={250}
                className="w-full object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-green-700 mb-4">{program.title}</h2>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <Link href={program.link} className="text-green-700 font-semibold hover:underline">
                  Learn More
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

const programs = [
  {
    title: "Health Initiatives",
    description:
      "Improving access to healthcare and supporting the wellbeing of vulnerable communities.",
    image: "/images/health-initiative.jpg",
    link: "/programs/health",
  },
  {
    title: "Climate Action",
    description:
      "Promoting sustainable practices and combating the adverse effects of climate change.",
    image: "/images/climate-action.jpg",
    link: "/programs/climate",
  },
  {
    title: "Education Programs",
    description:
      "Empowering young minds through education, mentorship, and skill-building initiatives.",
    image: "/images/education-program.jpg",
    link: "/programs/education",
  },
  {
    title: "4K Club Initiative",
    description:
      "Encouraging agricultural innovation among youth to make farming a viable career choice.",
    image: "/images/4k-club.jpg",
    link: "/programs/4k-club",
  },
  {
    title: "Tree Planting Campaigns",
    description:
      "Restoring ecosystems and promoting environmental conservation through afforestation.",
    image: "/images/tree-planting.jpg",
    link: "/programs/tree-planting",
  },
  {
    title: "Community Outreach",
    description:
      "Building resilient communities through partnerships and grassroots engagement.",
    image: "/images/community-outreach.jpg",
    link: "/programs/community-outreach",
  },
];

export default Programs;
