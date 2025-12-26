import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

export const handler = async () => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('price')
      .eq('type', 'consultation')
      .maybeSingle();

    if (error) {
      console.error('Error fetching consultation fee:', error);
      return {
        statusCode: 200,
        body: JSON.stringify({ fee: 499 }), // Fallback
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ fee: data?.price || 499 }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch consultation fee', fee: 499 }),
    };
  }
};
