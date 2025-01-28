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
    location: Location;
    category: EventCategory;
    status: EventStatus;
    eventType: EventType;
    featuredImage?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export type EventCategory = 'fundraising' | 'community' | 'education' | 'mentorship' | 'other';
  export type EventStatus = 'draft' | 'published' | 'cancelled';
  export type EventType = 'physical' | 'virtual' | 'hybrid';