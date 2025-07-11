
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    
    const { quoteId, status } = await request.json();

    if (!quoteId || !status) {
      return NextResponse.json(
        { error: 'Quote ID and status are required' },
        { status: 400 }
      );
    }

    const validStatuses = ['NEW', 'CONTACTED', 'QUOTED', 'BOOKED', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const updatedQuote = await prisma.quote.update({
      where: { id: quoteId },
      data: { status }
    });

    return NextResponse.json(updatedQuote);
  } catch (error) {
    console.error('Error updating quote status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
