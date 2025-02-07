//volunteers/types

import { createClient } from "../utils/supabase/client";

const supabase = createClient()

export async function getPartnershiInterest(){
     const {data, error} =  await supabase.from('partnership_interest')
     .select('*')

     if (error) throw error

     return data
}