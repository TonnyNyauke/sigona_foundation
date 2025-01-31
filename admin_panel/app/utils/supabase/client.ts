import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const next_public_base_url = 'https://svlovzjwcqbuvvdqufsc.supabase.co';
const next_public_base_anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2bG92emp3Y3FidXZ2ZHF1ZnNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMDI2MDQsImV4cCI6MjA1Mzg3ODYwNH0.s1MvTEvr7yM1eOWtGaE9BAtixmp2Om0k-xrBvpKGDeI"

  return createBrowserClient(
    next_public_base_url,
    next_public_base_anon_key,
  )
}