import { createClient } from "../utils/supabase/client";
import { ContactFormData } from "./types";

const supabase = createClient()

export async function makeContact(formData: ContactFormData){
    const {error} = await supabase.from('contact')
    .insert({
        name: formData.name,
        email: formData.email,
        message: formData.message
    })

    if (error) throw error
}