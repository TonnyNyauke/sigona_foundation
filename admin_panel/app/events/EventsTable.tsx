'use client'

import { format } from 'date-fns';
import { Event, EventStatus } from './types';
import { useEffect, useState } from 'react';
import { createClient } from '../utils/supabase/client';
import EventPreview from './EventPreview';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from '@/hooks/use-toast';

interface EventsTableProps {
  onStatusChange: (id: string, status: EventStatus) => void;
}

export const EventsTable: React.FC<EventsTableProps> = ({
  onStatusChange
}) => {
  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  const supabase = createClient();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [events]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*');

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (event: Event) => {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!eventToDelete) return;

    try {
      setIsDeleting(true);
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventToDelete.id);

      if (error) throw error;

      // Update local state
      setEvents(events.filter(event => event.id !== eventToDelete.id));
      toast({
        title: "Event deleted",
        description: `"${eventToDelete.name}" has been successfully deleted.`
      });
    } catch (err) {
      console.error('Error deleting event:', err);
      toast({
        title: "Error",
        description: "Failed to delete the event. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-left">
            <th className="py-3 px-4">Event</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Location</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className="flex items-center space-x-3">
                  {event.featured_image_url && (
                    <img
                      src={event.featured_image_url}
                      alt={event.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <div className="font-medium">{event.name}</div>
                    <div className="text-sm text-gray-500">
                      {event.description.substring(0, 50)}...
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className="px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  {event.category}
                </span>
              </td>
              <td className="py-3 px-4">{format(new Date(event.date), "dd MMM yyyy")}</td>
              <td className="py-3 px-4">
                <div>{event.venue}</div>
                <div className="text-sm text-gray-500">
                  {event.city}, {event.country}
                </div>
              </td>
              <td className="py-3 px-4">
                <select
                  value={event.status}
                  onChange={(e) => onStatusChange(event.id, e.target.value as EventStatus)}
                  className={`px-2 py-1 rounded-full text-sm ${getStatusColor(event.status)}`}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-500"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleDeleteClick(event)}
                    disabled={isDeleting}
                    className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEvent && (
        <EventPreview 
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{eventToDelete?.name}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}