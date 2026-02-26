import { NextResponse } from 'next/server';
import { getSupabaseAnon } from '@/lib/supabase-admin';

export async function GET() {
  try {
    const supabase = getSupabaseAnon();
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
