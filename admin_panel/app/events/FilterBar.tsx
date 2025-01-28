import { EventCategory, EventStatus, EventType } from "./types";

// components/FilterBar.tsx
interface FilterBarProps {
    onFilterChange: (filters: {
      category?: EventCategory;
      status?: EventStatus;
      eventType?: EventType;
    }) => void;
  }
  
  export const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
    return (
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          onChange={(e) =>
            onFilterChange({ category: e.target.value as EventCategory })
          }
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Categories</option>
          <option value="fundraising">Fundraising</option>
          <option value="community">Community Outreach</option>
          <option value="education">Education</option>
          <option value="mentorship">Mentorship</option>
          <option value="other">Other</option>
        </select>
  
        <select
          onChange={(e) =>
            onFilterChange({ status: e.target.value as EventStatus })
          }
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="cancelled">Cancelled</option>
        </select>
  
        <select
          onChange={(e) =>
            onFilterChange({ eventType: e.target.value as EventType })
          }
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Types</option>
          <option value="physical">Physical</option>
          <option value="virtual">Virtual</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>
    );
  };