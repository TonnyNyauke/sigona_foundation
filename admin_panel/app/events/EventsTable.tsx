import { format } from 'date-fns';
import { Event, EventStatus } from './types';

interface EventsTableProps {
  events: Event[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: EventStatus) => void;
  onPreview: (event: Event) => void;
}

export const EventsTable: React.FC<EventsTableProps> = ({
  events,
  onDelete,
  onStatusChange,
  onPreview,
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
                  {event.featuredImage && (
                    <img
                      src={event.featuredImage}
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
                <div>{event.location.venue}</div>
                <div className="text-sm text-gray-500">
                  {event.location.city}, {event.location.country}
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
                    onClick={() => onPreview(event)}
                    className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-500"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => onDelete(event.id)}
                    className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};