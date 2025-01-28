'use client';

import { useState } from "react";
import { format } from "date-fns";

const PartnerManagement = () => {
  const [partners, setPartners] = useState(mockPartners);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this partner proposal?");
    if (confirmed) {
      setPartners(partners.filter((partner) => partner.id !== id));
    }
  };

  const handleStatusChange = (id: string, status: string) => {
    setPartners(
      partners.map((partner) =>
        partner.id === id ? { ...partner, status } : partner
      )
    );
  };

  const filteredPartners = partners.filter((partner) =>
    partner.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-green-700 text-white py-4 px-6">
        <h1 className="text-xl font-bold">Partner Management</h1>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Manage Partner Proposals</h2>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by organization name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-left">
                <th className="py-3 px-6">Organization</th>
                <th className="py-3 px-6">Contact Person</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Phone</th>
                <th className="py-3 px-6">Proposal</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPartners.map((partner) => (
                <tr key={partner.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{partner.organization}</td>
                  <td className="py-3 px-6">{partner.contactPerson}</td>
                  <td className="py-3 px-6">{partner.email}</td>
                  <td className="py-3 px-6">{partner.phone}</td>
                  <td className="py-3 px-6 truncate max-w-md">{partner.details}</td>
                  <td className="py-3 px-6">
                    <select
                      value={partner.status}
                      onChange={(e) => handleStatusChange(partner.id, e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleDelete(partner.id)}
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

const mockPartners = [
  {
    id: "1",
    organization: "Green Planet Initiative",
    contactPerson: "John Doe",
    email: "john.doe@example.com",
    phone: "+254 700 123 456",
    details: "Looking to partner on tree-planting campaigns in Nairobi.",
    status: "pending",
  },
  {
    id: "2",
    organization: "EcoFuture Kenya",
    contactPerson: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+254 701 987 654",
    details: "Proposal for collaboration on climate action workshops.",
    status: "accepted",
  },
  {
    id: "3",
    organization: "AgriYouth Foundation",
    contactPerson: "Paul Otieno",
    email: "paul.otieno@example.com",
    phone: "+254 702 555 333",
    details: "Interested in joining efforts for the 4K Club mentorship program.",
    status: "pending",
  },
  {
    id: "4",
    organization: "Sustainable Development Africa",
    contactPerson: "Esther Wanjiku",
    email: "esther.wanjiku@example.com",
    phone: "+254 703 777 888",
    details: "Requesting a meeting to discuss partnership opportunities.",
    status: "rejected",
  },
];

export default PartnerManagement;
