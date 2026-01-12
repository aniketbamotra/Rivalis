import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('consultation_fee')
      .single();

    if (error) {
      console.error('Error fetching consultation fee:', error);
      // Return default fee if error
      return NextResponse.json({ fee: 499 });
    }

    return NextResponse.json({ fee: data?.consultation_fee || 499 });
  } catch (error) {
    console.error('Error in consultation-fee route:', error);
    return NextResponse.json({ fee: 499 });
  }
}
