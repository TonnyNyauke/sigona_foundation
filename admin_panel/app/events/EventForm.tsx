'use client'

import { useState } from 'react';
import { Event, EventCategory, EventType } from './types';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '../utils/supabase/client';

type EventFormData = Omit<Event, 'id' | 'created_at' | 'updated_at'>;

interface EventFormProps {
  onSuccess?: (event: Event) => void;
  onError?: (error: Error) => void;
}

export const EventForm: React.FC<EventFormProps> = ({ 
  onSuccess,
  onError 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { toast } = useToast();
  const supabase = createClient();

  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    description: '',
    date: '',
    venue: '',
    city: '',
    country: '',
    featured_image_url: '',
    category: 'other',
    status: 'draft',
    event_type: 'physical',
  });

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('stf_foundation')
      .upload(`events/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      //throw new Error('Failed to upload image');
      console.error(uploadError)
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('stf_foundation')
      .getPublicUrl(`events/${fileName}`);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl: string | undefined;

      if (image) {
        imageUrl = await uploadImage(image);
      }

      const eventData = {
        ...formData,
        featured_image_url: imageUrl,
      };

      const { data, error } = await supabase
        .from('events')
        .insert(eventData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Event created successfully!',
      });

      onSuccess?.(data);
      setFormData({
        name: '',
        description: '',
        date: '',
        venue: '',
        city: '',
        country: '',
        featured_image_url: '',
        category: 'other',
        status: 'draft',
        event_type: 'physical',
      })
      setImage(null)

    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create event',
        variant: 'destructive',
      });
      onError?.(error as Error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Event Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Event Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 h-32"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            disabled={isSubmitting}
          >
            <option value="fundraising">Fundraising</option>
            <option value="community">Community Outreach</option>
            <option value="education">Education</option>
            <option value="mentorship">Mentorship</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Event Type</label>
          <select
            value={formData.event_type}
            onChange={(e) => setFormData({ ...formData, event_type: e.target.value as EventType })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            disabled={isSubmitting}
          >
            <option value="physical">Physical</option>
            <option value="virtual">Virtual</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Venue</label>
            <input
              type="text"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Country</label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => setFormData({ ...formData, status: 'draft' })}
          className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          disabled={isSubmitting}
        >
          Save as Draft
        </button>
        <button
          type="submit"
          onClick={() => setFormData({ ...formData, status: 'published' })}
          className="bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-600 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Publishing...' : 'Publish Event'}
        </button>
      </div>
    </form>
  );
};