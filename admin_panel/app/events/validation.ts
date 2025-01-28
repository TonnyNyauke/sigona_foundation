// utils/validation.ts
import { z } from 'zod';

export const locationSchema = z.object({
  venue: z.string().min(1, 'Venue is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
});

export const eventSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().min(1, 'Date is required'),
  location: locationSchema,
  category: z.enum(['fundraising', 'community', 'education', 'mentorship', 'other']),
  status: z.enum(['draft', 'published', 'cancelled']),
  eventType: z.enum(['physical', 'virtual', 'hybrid']),
  featuredImage: z.string().optional(),
});