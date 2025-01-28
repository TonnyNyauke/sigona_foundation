'use client';

import { useState } from "react";
import { format } from "date-fns";

const VolunteerManagement = () => {
  const [volunteers, setVolunteers] = useState(mockVolunteers);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this volunteer?");
    if (confirmed) {
      setVolunteers(volunteers.filter((volunteer) => volunteer.id !== id));
    }
  };

  const filteredVolunteers = volunteers.filter((volunteer) =>
    volunteer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-green-700 text-white py-4 px-6">
        <h1 className="text-xl font-bold">Volunteer Management</h1>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Manage Volunteers</h2>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by volunteer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-left">
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Phone</th>
                <th className="py-3 px-6">Skills</th>
                <th className="py-3 px-6">Sign-up Date</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVolunteers.map((volunteer) => (
                <tr key={volunteer.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{volunteer.name}</td>
                  <td className="py-3 px-6">{volunteer.email}</td>
                  <td className="py-3 px-6">{volunteer.phone}</td>
                  <td className="py-3 px-6">{volunteer.skills}</td>
                  <td className="py-3 px-6">{format(new Date(volunteer.date), "dd MMM yyyy")}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleDelete(volunteer.id)}
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
      </main>
    </div>
  );
};

const mockVolunteers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+254 700 123 456",
    skills: "Community Outreach, Fundraising",
    date: "2025-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+254 701 987 654",
    skills: "Event Planning, Public Speaking",
    date: "2025-01-20",
  },
  {
    id: "3",
    name: "Paul Otieno",
    email: "paul.otieno@example.com",
    phone: "+254 702 555 333",
    skills: "Graphic Design, Social Media Management",
    date: "2025-01-25",
  },
  {
    id: "4",
    name: "Esther Wanjiku",
    email: "esther.wanjiku@example.com",
    phone: "+254 703 777 888",
    skills: "Project Management, Data Analysis",
    date: "2025-01-30",
  },
];

export default VolunteerManagement;
