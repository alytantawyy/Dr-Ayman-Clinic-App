import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase URL and Anon Key
const supabaseUrl = 'https://pqcavrhmjilguwxkpphc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxY2F2cmhtamlsZ3V3eGtwcGhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5MjkwNTIsImV4cCI6MjA0ODUwNTA1Mn0.o5gQakoltoRXmjbgpPUC_4v8I8Nhja-M8tPPFHvmtJI';

export const supabase = createClient(supabaseUrl, supabaseKey);
