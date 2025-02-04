'use client'

import React, { useEffect, useState } from 'react';
import { Event } from './types';
import { format, isPast } from 'date-fns';
import { getEvents } from './events';
import Image from 'next/image';
import { Calendar, MapPin, Users, Leaf, ArrowRight, ExternalLink } from 'lucide-react';
import { Pagination } from '@/components/ui/pagination';
import Header from '../Home/Header';

export const EventsDisplay: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch events');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading || error) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 shadow-xl">
          {isLoading ? (
            <div className="animate-pulse flex flex-col gap-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ) : (
            <p className="text-red-600 flex items-center gap-2">Error: {error}</p>
          )}
        </div>
      </div>
    );
  }

  // Split events into upcoming and past
  const upcomingEvents = events.filter(event => !isPast(new Date(event.date)));
  const pastEvents = events.filter(event => isPast(new Date(event.date)));

  // Calculate pagination for past events
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentPastEvents = pastEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(pastEvents.length / eventsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Environmental Theme */}
      <Header />
      <div className="relative bg-gradient-to-br from-green-700 to-emerald-900 text-white py-14 overflow-hidden mt-10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/leaf-pattern.svg')] bg-repeat"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl font-bold mb-6 flex items-center gap-3">
              <Leaf className="w-8 h-8" />
              Creating Lasting Environmental Impact
            </h1>
            <p className="text-xl mb-8">Join us in our mission to transform communities through sustainable climate action and environmental conservation.</p>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
          <Calendar className="w-8 h-8 text-green-700" />
          Upcoming Events
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              {event.featured_image_url && (
                <div className="relative h-56 group">
                  <Image
                    src={event.featured_image_url}
                    alt={event.name}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                  <div className="absolute inset-0 bg-green-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium">View Details</span>
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 font-medium">
                    {event.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-700 font-medium">
                    {event.event_type}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-800">{event.name}</h3>
                
                <div className="space-y-3 text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-700" />
                    <span>{format(new Date(event.date), "MMMM do yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-700" />
                    <span>{event.venue}, {event.city}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2">{event.description}</p>

                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition-colors">
                    Register Now <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  <button className="flex items-center gap-2 text-green-700 hover:text-green-800">
                    <Users className="w-4 h-4" />
                    Volunteer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Past Events Section */}
        <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
          <ExternalLink className="w-8 h-8 text-green-700" />
          Past Events
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {currentPastEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              {event.featured_image_url && (
                <div className="relative h-48">
                  <Image
                    src={event.featured_image_url}
                    alt={event.name}
                    fill
                    className="object-cover rounded-t-xl filter grayscale"
                  />
                </div>
              )}
              
              <div className="p-6">
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 font-medium mb-3 inline-block">
                  {event.category}
                </span>

                <h3 className="text-lg font-bold mb-3 text-gray-800">{event.name}</h3>
                
                <div className="space-y-2 text-gray-600 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(event.date), "MMMM do yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.venue}, {event.city}</span>
                  </div>
                </div>

                <button className="flex items-center gap-2 text-green-700 hover:text-green-800 mt-4">
                  View Impact Report <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsDisplay;