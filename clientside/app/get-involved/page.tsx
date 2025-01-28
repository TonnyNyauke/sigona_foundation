'use client';

import { NextPage } from "next";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { Users, Handshake} from 'lucide-react';
import VolunteerSignUp from "../forms/VolunteerSignUp";
import Donate from "../forms/Donate";
import PartnerWithUs from "../forms/PartnerWithUs";

const GetInvolved: NextPage = () => {

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <Header />
      
      {/* Enhanced Hero Section with Impact Stats */}
      <header className="bg-green-700 text-white py-16 text-center mt-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Make an Impact Today</h1>
          <p className="text-xl mt-2 max-w-2xl mx-auto">
            Join our mission of transforming lives through sustainable initiatives.
          </p>
          
          {/* 2023 Impact Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            {impactNumbers.map((impact) => (
              <div key={impact.label} className="p-4 bg-white bg-opacity-10 rounded-lg">
                <div className="text-3xl font-bold">{impact.number}</div>
                <div className="text-sm mt-1">{impact.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Direct Donation Section */}
        <section className="mb-20">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="">
              <div className="p-8 bg-green-50">
                <h2 className="text-3xl font-bold text-green-700 mb-4">Support Our Mission</h2>
              </div>
              <div className="p-8">
                <Donate />
              </div>
            </div>
          </div>
        </section>

        {/* Other Involvement Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              <div className="text-green-700 flex justify-center mb-6">
                <Users className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">Volunteer With Us</h2>
              <p className="text-gray-600 mb-6 text-center">Join our team of 200+ volunteers and make a difference by contributing your time and skills.</p>
              <VolunteerSignUp />
            </div>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              <div className="text-green-700 flex justify-center mb-6">
                <Handshake className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">Partner With Us</h2>
              <p className="text-gray-600 mb-6 text-center">Join our network of 50+ corporate partners driving sustainable change through strategic collaboration.</p>
              <PartnerWithUs />
            </div>
          </div>
        </div>

        {/* Success Stories Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200" /> {/* Placeholder for story image */}
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{story.title}</h3>
                  <p className="text-gray-600 mb-4">{story.description}</p>
                  <div className="text-green-700 font-semibold">{story.impact}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const impactNumbers = [
  { number: "25K+", label: "Lives Impacted in 2023" },
  { number: "15", label: "Communities Served" },
  { number: "$2.5M", label: "Funds Distributed" },
  { number: "200+", label: "Active Volunteers" },
];

const successStories = [
  {
    title: "Clean Water Initiative",
    description: "Implemented sustainable water solutions in rural communities lacking access to clean water.",
    impact: "12,000 people now have access to clean water"
  },
  {
    title: "Education Empowerment",
    description: "Provided scholarships and educational resources to underprivileged students.",
    impact: "500 students received quality education"
  },
  {
    title: "Sustainable Agriculture",
    description: "Established community gardens and provided farming training to local communities.",
    impact: "150 families achieved food security"
  }
];

export default GetInvolved;