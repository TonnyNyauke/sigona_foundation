'use client';

import { useState } from 'react';
import { Event, EventStatus } from './types';
import { EventsTable } from './EventsTable';
import { EventForm } from './EventForm';
import { EventPreview } from './EventPreview';

const EventsManagement = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleAddEvent = (newEvent: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    const event: Event = {
      ...newEvent,
      id: (events.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    // pages/EventsManagement.tsx (continued)
    setEvents([...events, event]);
  };

  const handleDeleteEvent = (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this event?");
    if (confirmed) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  const handleStatusChange = (id: string, status: EventStatus) => {
    setEvents(
      events.map((event) =>
        event.id === id
          ? { ...event, status, updatedAt: new Date().toISOString() }
          : event
      )
    );
  };

  const handlePreview = (event: Event) => {
    setSelectedEvent(event);
    setShowPreview(true);
  };

  const filteredEvents = events.filter((event) => {
    return event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           event.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
           event.location.country.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-green-700 text-white py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Events Management</h1>
          <p className="text-green-100">Manage and publish events for Sigona Thomas Foundation</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">All Events</h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <EventsTable
              events={filteredEvents}
              onDelete={handleDeleteEvent}
              onStatusChange={handleStatusChange}
              onPreview={handlePreview}
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
          <EventForm onSubmit={handleAddEvent} />
        </div>

        {showPreview && selectedEvent && (
          <EventPreview
            event={selectedEvent}
            onClose={() => {
              setShowPreview(false);
              setSelectedEvent(null);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default EventsManagement;



