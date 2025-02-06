import { createClient } from "../utils/supabase/client";
import { Partner } from "./types";

const supabase = createClient()

export async function sendRequest(data: Partner){
    const {error} = await supabase.from('partnership_interest')
    .insert({
        organization_type: data.organizationType,
        organization_name: data.organizationName,
        contact_person: data.contactPerson,
        email: data.email,
        phone: data.phone,
        interest: data.interest,
        message: data.message
    })

    if (error) throw error
}