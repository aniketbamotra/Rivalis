import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const token = formData.get('token') as string;

    if (!file || !token) {
      return NextResponse.json(
        { error: 'File and token are required' },
        { status: 400 }
      );
    }

    // Validate token
    const { data: inquiry, error: inquiryError } = await supabase
      .from('partner_inquiries')
      .select('id, email')
      .eq('application_token', token)
      .single();

    if (inquiryError || !inquiry) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${inquiry.id}/${timestamp}_${sanitizedFilename}`;

    // Upload to Supabase Storage
    const { error } = await supabase.storage
      .from('partner-documents')
      .upload(filename, file, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('partner-documents')
      .getPublicUrl(filename);

    return NextResponse.json({ 
      success: true, 
      url: urlData.publicUrl,
      path: filename 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
