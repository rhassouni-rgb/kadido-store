import { createClient } from '@supabase/supabase-js'

// 👇 الرابط الخاص بمشروعك
const supabaseUrl = "https://vibaxtyrszpuxttiwymp.supabase.co"

// 👇 المفتاح الخاص بمشروعك
const supabaseKey = "sb_publishable_HzLxfFX-0jKQhRZsGAdk5A_-mpl6pGl"

export const supabase = createClient(supabaseUrl, supabaseKey)