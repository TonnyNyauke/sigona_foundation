import { NextPage } from "next";
import Link from "next/link";
import Header from "../Home/Header";

const Events: NextPage = () => {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
        <Header />
      <header className="bg-green-700 text-white py-8 text-center mt-12">
        <h1 className="text-4xl font-bold">Upcoming Events</h1>
        <p className="mt-2">
          Stay updated with the latest events hosted by the Sigona Thomas Foundation.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.title}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-green-700 mb-4">{event.title}</h2>
                  <p className="text-gray-600 mb-2">
                    <strong>Date:</strong> {event.date}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  {event.link && (
                    <Link href={event.link} className="text-green-700 font-semibold hover:underline">
                      Learn More
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">
            No upcoming events at the moment. Please check back later.
          </p>
        )}
      </main>
    </div>
  );
};

const events = [
  {
    title: "Community Tree Planting Day",
    date: "March 15, 2025",
    location: "Gembe Hills, Homa Bay, Kenya",
    description: "Join us in planting trees to restore the environment and combat climate change.",
    link: "/events/community-tree-planting",
  },
  {
    title: "Youth Climate Action Workshop",
    date: "April 22, 2025",
    location: "Legacy Building, Homa Bay",
    description: "Empowering young leaders to take actionable steps against climate change.",
    link: "/events/youth-climate-action",
  },
];

export default Events;
