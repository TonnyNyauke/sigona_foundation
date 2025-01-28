'use client'

import { useState } from 'react';
import { Event, EventCategory, EventType } from './types';
import { EventStatus } from './types';

interface EventFormProps {
  onSubmit: (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const EventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
  const [image, setImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location: {
      venue: '',
      city: '',
      country: '',
    },
    category: 'other' as EventCategory,
    status: 'draft' as EventStatus,
    eventType: 'physical' as EventType,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const imageUrl = image ? URL.createObjectURL(image) : undefined;
    onSubmit({ ...formData, featuredImage: imageUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Event Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Event Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 h-32"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="fundraising">Fundraising</option>
            <option value="community">Community Outreach</option>
            <option value="education">Education</option>
            <option value="mentorship">Mentorship</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Event Type</label>
          <select
            value={formData.eventType}
            onChange={(e) => setFormData({ ...formData, eventType: e.target.value as EventType })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="physical">Physical</option>
            <option value="virtual">Virtual</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Venue</label>
            <input
              type="text"
              value={formData.location.venue}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: { ...formData.location, venue: e.target.value },
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">City</label>
            <input
              type="text"
              value={formData.location.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: { ...formData.location, city: e.target.value },
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Country</label>
            <input
              type="text"
              value={formData.location.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: { ...formData.location, country: e.target.value },
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => setFormData({ ...formData, status: 'draft' })}
          className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-400"
        >
          Save as Draft
        </button>
        <button
          type="submit"
          onClick={() => setFormData({ ...formData, status: 'published' })}
          className="bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-600"
        >
          Publish Event
        </button>
      </div>
    </form>
  );
};