//volunteer.ts
'use server'

import { createClient } from "../utils/supabase/client";

const supabase = createClient(
);

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  preferredCounty: string;
  timeCommitment: string;
  preferredTime: string;
  volunteerType: string;
  skillsExperience: string;
}

export async function createVolunteer(data: FormData) {
  try {
    if (!data.email || !data.firstName || !data.lastName || !data.phoneNumber) {
      return {
        error: 'Missing required fields',
        success: false
      };
    }

    const { data: volunteer, error } = await supabase
      .from('volunteers')
      .insert([
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone_number: data.phoneNumber,
          preferred_county: data.preferredCounty,
          time_commitment: data.timeCommitment,
          preferred_time: data.preferredTime,
          volunteer_type: data.volunteerType,
          skills_experience: data.skillsExperience,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error inserting volunteer:', error);
      return {
        error: 'Failed to register volunteer',
        success: false
      };
    }

    return {
      data: volunteer,
      success: true
    };
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      error: 'Internal server error',
      success: false
    };
  }
}

export async function getVolunteers() {
  try {
    const { data, error } = await supabase
      .from('volunteers')
      .select('*');

    if (error) {
      return {
        error: 'Failed to fetch volunteers',
        success: false
      };
    }

    return {
      data,
      success: true
    };
  } catch (error) {
    return {
      error: 'Internal server error',
      success: false
    };
  }
}