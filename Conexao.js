import { createClient } from "@supabase/supabase-js";
const link = "https://xekjvvtgayayrleoojiz.supabase.co"
const chave = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhla2p2dnRnYXlheXJsZW9vaml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgzMTU4MTUsImV4cCI6MjAzMzg5MTgxNX0.0_wFzXOAqyZe4_uTsEuCqbnFqmnskSflbTym3v9J_4o"
export const supabase = createClient(link, chave);