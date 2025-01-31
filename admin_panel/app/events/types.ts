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
  
  export type EventCategory = 'fundraising' | 'community' | 'education' | 'mentorship' | 'other';
  export type EventStatus = 'draft' | 'published' | 'cancelled';
  export type EventType = 'physical' | 'virtual' | 'hybrid';
  