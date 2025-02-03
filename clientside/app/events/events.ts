import { createClient } from "../utils/supabase/client";

const supabase = createClient()

export async function getEvents(){
    const { data, error } = await supabase.from('events')
    .select('*')

    if (error) throw error
    return data;
}