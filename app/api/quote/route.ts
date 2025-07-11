import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, fromAddress, toAddress, moveDate, message } = body

    // Validate required fields
    if (!name || !email || !phone || !fromAddress || !toAddress || !moveDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create quote in database
    const quote = await prisma.quote.create({
      data: {
        name,
        email,
        phone,
        fromAddress,
        toAddress,
        moveDate: new Date(moveDate),
        message: message || null,
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