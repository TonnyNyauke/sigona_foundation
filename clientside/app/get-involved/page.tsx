import { NextPage } from "next";
import Link from "next/link";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

const GetInvolved: NextPage = () => {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
        <Header />
      <header className="bg-green-700 text-white py-8 text-center mt-10">
        <h1 className="text-4xl font-bold">Get Involved</h1>
        <p className="mt-2">
          Be part of the change by contributing to our mission of transforming lives through sustainable initiatives.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Call to Action Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {actions.map((action) => (
            <div
              key={action.title}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
            >
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-green-700 mb-4">{action.title}</h2>
                <p className="text-gray-600 mb-6">{action.description}</p>
                <Link href={action.link} className="bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-600">
                  {action.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Why Get Involved Section */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Why Your Involvement Matters</h2>
          <p className="text-lg text-gray-600 mb-6">
            Your support helps us create impactful programs that empower communities, promote sustainability, and build a brighter future.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const actions = [
  {
    title: "Donate",
    description: "Your contribution helps us implement impactful programs and reach more communities in need.",
    buttonText: "Donate Now",
    link: "/donate",
  },
  {
    title: "Volunteer",
    description: "Join our team of volunteers and make a difference by contributing your time and skills.",
    buttonText: "Sign Up to Volunteer",
    link: "/volunteer",
  },
  {
    title: "Partner with Us",
    description: "Collaborate with us to drive sustainable change through strategic partnerships.",
    buttonText: "Partner with Us",
    link: "/partner",
  },
];

export default GetInvolved;