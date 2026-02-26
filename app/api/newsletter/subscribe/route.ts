import { NextRequest, NextResponse } from 'next/server';

const HASHNODE_API_URL = 'https://gql.hashnode.com';
const PUBLICATION_HOST = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_ID || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    console.log('📧 Newsletter subscription attempt:', email);
    console.log('📍 Publication host:', PUBLICATION_HOST);

    // First, get the publication ID from the host
    const publicationQuery = `
      query GetPublication($host: String!) {
        publication(host: $host) {
          id
        }
      }
    `;

    const pubResponse = await fetch(HASHNODE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: publicationQuery,
        variables: {
          host: PUBLICATION_HOST,
        },
      }),
    });

    const pubData = await pubResponse.json();
    
    if (pubData.errors || !pubData.data?.publication?.id) {
      console.error('❌ Failed to get publication ID:', pubData.errors);
      return NextResponse.json(
        { error: 'Publication not found. Please contact support.' },
        { status: 500 }
      );
    }

    const publicationId = pubData.data.publication.id;
    console.log('✅ Found publication ID:', publicationId);

    // Now subscribe to Hashnode newsletter using the ObjectId
    const mutation = `
      mutation SubscribeToNewsletter($input: SubscribeToNewsletterInput!) {
        subscribeToNewsletter(input: $input) {
          status
        }
      }
    `;

    const requestBody = {
      query: mutation,
      variables: {
        input: {
          publicationId: publicationId,
          email: email,
        },
      },
    };

    console.log('📤 Sending to Hashnode:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(HASHNODE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log('📥 Hashnode response:', JSON.stringify(data, null, 2));

    if (data.errors) {
      console.error('❌ Hashnode API Error:', data.errors);
      return NextResponse.json(
        { error: data.errors[0]?.message || 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    if (data.data?.subscribeToNewsletter?.status) {
      console.log('✅ Successfully subscribed via Hashnode:', email);
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed! Check your email to confirm.',
      });
    }

    // If Hashnode newsletter is not available, show appropriate message
    if (data.message === 'Service Unavailable') {
      console.log('⚠️  Hashnode newsletter not enabled, showing info message');
      return NextResponse.json({
        success: true,
        message: 'Thank you for your interest! Newsletter coming soon.',
      });
    }

    console.error('❌ Unexpected response format:', data);
    return NextResponse.json(
      { error: 'Subscription failed. Please try again.' },
      { status: 500 }
    );
  } catch (error) {
    console.error('❌ Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
