import { createClient } from "@/app/utils/supabase/client";

const supabase = createClient();

export async function fetchArticles(id:string){
    const { data, error } = await supabase.from('articles')
    .select('*')
    .eq('id', id)
    .single()

    if (error) throw error

    return data;
}