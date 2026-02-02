import { createClient } from '@supabase/supabase-js';

// Load environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Warn if credentials are missing (for local dev without setup)
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL or Anon Key is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

// Create Supabase client
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

// Types for our database
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      modules: {
        Row: {
          id: string
          title: string
          description: string | null
          content: string | null
          type: 'knowledge' | 'tool' | 'tutorial' | 'other'
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          content?: string | null
          type: 'knowledge' | 'tool' | 'tutorial' | 'other'
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          content?: string | null
          type?: 'knowledge' | 'tool' | 'tutorial' | 'other'
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      ai_news: {
        Row: {
          id: string
          original_title: string
          summary: string
          content: string
          difficulty_level: 'beginner' | 'intermediate' | 'advanced'
          source_url: string | null
          tags: string[] | null
          is_published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          original_title: string
          summary: string
          content: string
          difficulty_level?: 'beginner' | 'intermediate' | 'advanced'
          source_url?: string | null
          tags?: string[] | null
          is_published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          original_title?: string
          summary?: string
          content?: string
          difficulty_level?: 'beginner' | 'intermediate' | 'advanced'
          source_url?: string | null
          tags?: string[] | null
          is_published?: boolean
          created_at?: string
        }
      }
    }
  }
}
