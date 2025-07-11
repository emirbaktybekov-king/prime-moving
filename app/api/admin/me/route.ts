
import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminFromToken();
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(admin);
  } catch (error) {
    console.error('Get admin error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
