import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, moveDate, message } = body

    // Validate required fields - only name is required
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    // Create quote in database
    const quote = await prisma.quote.create({
      data: {
        name: name.trim(),
        email: email && email.trim() !== '' ? email.trim() : null,
        phone: phone && phone.trim() !== '' ? phone.trim() : null,
        moveDate: moveDate ? new Date(moveDate) : null,
        message: message && message.trim() !== '' ? message.trim() : null,
      },
    })

    return NextResponse.json(
      { message: 'Quote request submitted successfully', quoteId: quote.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating quote:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}