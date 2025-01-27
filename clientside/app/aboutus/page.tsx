import { NextPage } from "next";
import Image from "next/image";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

const AboutUs: NextPage = () => {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
        <Header />
      <header className="bg-green-700 text-white py-8 text-center mt-10">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-2">
          Learn more about the Sigona Thomas Foundation and our mission to transform lives through climate action.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Mission and Vision Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Mission & Vision</h2>
          <div className="text-center text-lg space-y-4">
            <p>
              Our mission is to build resilient communities of practice based on climate actions for sustainable
              development and impact.
            </p>
            <p>
              Our vision is to expedite the transformation of livelihoods through sustainable climate actions for
              climate financing at all levels.
            </p>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-700 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* History Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our History</h2>
          <div className="text-lg text-center space-y-4">
            <p>
              Founded in 2019, the Sigona Thomas Foundation was born out of a passion for empowering communities
              and mitigating the adverse effects of climate change.
            </p>
            <p>
              Over the years, we have worked tirelessly to promote climate action through initiatives in health,
              education, and environmental conservation.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white shadow-lg rounded-lg p-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center py-16 bg-green-700 text-white rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Join Us in Making a Difference</h2>
          <p className="text-lg mb-6">
            Partner with us to support our mission and bring sustainable change to communities in need.
          </p>
          <button className="bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-400">
            Get Involved
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const coreValues = [
  { title: "Partnerships for Ownership", description: "We nurture collaborations to empower local communities." },
  { title: "Sustainable Solutions", description: "We prioritize long-lasting, impactful initiatives." },
  { title: "Innovation & Experimentation", description: "We value creativity in solving challenges." },
  { title: "Integrity & Trust", description: "We operate with transparency and accountability." },
];

const teamMembers = [
  {
    name: "Kefa Sigona",
    role: "Chief Executive Officer",
    image: "/images/kefa-sigona.jpg",
  },
  {
    name: "Steve Amolo",
    role: "Head of Programs",
    image: "/images/steve-amolo.jpg",
  },
  {
    name: "Pamela Nyangaya",
    role: "Community Outreach Coordinator",
    image: "/images/pamela-nyangaya.jpg",
  },
];

export default AboutUs;
