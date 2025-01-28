'use client';

import { useState } from "react";
import { format } from "date-fns";

const DonationsManagement = () => {
  const [donations, setDonations] = useState(mockDonations);

  const handleDelete = (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this donation?");
    if (confirmed) {
      setDonations(donations.filter((donation) => donation.id !== id));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-green-700 text-white py-4 px-6">
        <h1 className="text-xl font-bold">Donations Management</h1>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Manage Donations</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-left">
                <th className="py-3 px-6">Donor Name</th>
                <th className="py-3 px-6">Amount (Ksh)</th>
                <th className="py-3 px-6">Method</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{donation.name}</td>
                  <td className="py-3 px-6">{donation.amount}</td>
                  <td className="py-3 px-6">{donation.method}</td>
                  <td className="py-3 px-6">{format(new Date(donation.date), "dd MMM yyyy")}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleDelete(donation.id)}
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

const mockDonations = [
  {
    id: "1",
    name: "John Doe",
    amount: 5000,
    method: "MPESA",
    date: "2025-01-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    amount: 20000,
    method: "Bank Transfer",
    date: "2025-01-10",
  },
  {
    id: "3",
    name: "Paul Otieno",
    amount: 1500,
    method: "MPESA",
    date: "2025-01-15",
  },
  {
    id: "4",
    name: "Esther Wanjiku",
    amount: 10000,
    method: "Bank Transfer",
    date: "2025-01-20",
  },
];

export default DonationsManagement;
