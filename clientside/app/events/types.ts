// types.ts
export interface Location {
    venue: string;
    city: string;
    country: string;
  }
  
  export interface Event {
    id: string;
    name: string;
    description: string;
    date: string;
    featured_image_url?: string;
    category: EventCategory;
    status: EventStatus;
    event_type: EventType;
    venue: string;
    city: string;
    country: string;
  }
  export type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  
  export type EventCategory = 'fundraising' | 'community' | 'education' | 'mentorship' | 'other';
  export type EventStatus = 'upcoming' | 'past' | 'cancelled';
  export type EventType = 'physical' | 'virtual' | 'hybrid';
  