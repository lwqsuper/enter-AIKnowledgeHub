import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/supabase';

type Module = Database['public']['Tables']['modules']['Row'];
type NewModule = Database['public']['Tables']['modules']['Insert'];
type UpdateModule = Database['public']['Tables']['modules']['Update'];

export const moduleService = {
  async getAll() {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async create(module: NewModule) {
    const { data, error } = await supabase
      .from('modules')
      .insert(module)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: UpdateModule) {
    const { data, error } = await supabase
      .from('modules')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('modules')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
