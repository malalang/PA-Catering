import { NextResponse } from 'next/server';
import GetUser from '@/firebase/users/server/GetServerUser';

export async function GET() {
  try {
    const user = await GetUser();

    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
