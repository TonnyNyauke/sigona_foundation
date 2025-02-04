import { createClient } from "../utils/supabase/client";

const supabase = createClient()

export async function getBlogs() {
    const {data , error} = await supabase.from('articles')
    .select('*')

    if (error) throw error

    console.log(data)
    return data
}