import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pazmujqputridhxajicb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhem11anFwdXRyaWRoeGFqaWNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MDY1NTgsImV4cCI6MjA5MTE4MjU1OH0.9IiyWgbQcWS99JSvbPoMW7aOWR-CniCob6qlo1hgZCM'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage: AsyncStorage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  }
)



