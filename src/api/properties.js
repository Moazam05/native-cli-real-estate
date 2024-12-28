import {supabase} from '../supabase/supabaseClient';

export async function getLatestProperties() {
  try {
    const {data, error} = await supabase
      .from('Properties')
      .select('*')
      .order('createdAt')
      .limit(5);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getLatestProperties:', error);
    return [];
  }
}
