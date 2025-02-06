//volunteers/types

import { createClient } from "../utils/supabase/client";

const supabase = createClient()

export async function getVolunteers(){
     const {data, error} =  await supabase.from('volunteers')
     .select('*')

     if (error) throw error

     return data
}