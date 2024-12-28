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

export async function getProperties({filter, query, limit = 6}) {
  try {
    let supabaseQuery = supabase
      .from('Properties')
      .select(
        `
        *,
        agent:Agents(*),
        gallery:Galleries(*),
        reviews:Reviews(*)
      `,
      )
      .order('createdAt');

    // Add filter if it exists and isn't "All"
    if (filter && filter !== 'All') {
      // Match the exact case from your schema enum
      const propertyTypeMap = {
        house: 'House',
        townhouses: 'Townhouses',
        condos: 'Condos',
        duplexes: 'Duplexes',
        studios: 'Studios',
        villas: 'Villas',
        apartments: 'Apartments',
        others: 'Others',
      };

      const formattedFilter = propertyTypeMap[filter.toLowerCase()];
      if (formattedFilter) {
        supabaseQuery = supabaseQuery.eq('type', formattedFilter);
      }
    }

    // Add search if query exists
    if (query) {
      supabaseQuery = supabaseQuery.or(`
        name.ilike.%${query}%,
        address.ilike.%${query}%,
        type.ilike.%${query}%,
        description.ilike.%${query}%
      `);
    }

    // Add limit
    if (limit) {
      supabaseQuery = supabaseQuery.limit(limit);
    }

    const {data, error} = await supabaseQuery;

    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getProperties:', error);
    return [];
  }
}
