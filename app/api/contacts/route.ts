import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ error: 'Use /api/contacts/[id] to access a specific contact' }, { status: 400 })
}

export async function POST() {
  return NextResponse.json({ error: 'Use /api/contacts/[id]/reply to send a reply' }, { status: 400 })
}