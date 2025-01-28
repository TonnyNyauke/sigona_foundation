import { Event } from './types';
import { format } from 'date-fns';

interface EventPreviewProps {
  event: Event;
  onClose: () => void;
}

export const EventPreview: React.FC<EventPreviewProps> = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Event Preview</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          {event.featuredImage && (
            <img
              src={event.featuredImage}
              alt={event.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          )}
          
          <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
          
          <div className="flex items-center space-x-4 mb-4">
            <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              {event.category}
            </span>
            <span className="text-gray-500">
              {format(new Date(event.date), "EEEE, MMMM do yyyy")}
            </span>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Location</h3>
            <p>
              {event.location.venue}<br />
              {event.location.city}, {event.location.country}
            </p>
          </div>
          
          <div className="prose max-w-none">
            <h3 className="font-medium mb-2">About This Event</h3>
            <p>{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};