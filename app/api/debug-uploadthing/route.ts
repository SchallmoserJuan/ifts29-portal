import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    uploadthingTokenExists: !!process.env.UPLOADTHING_TOKEN,
    uploadthingTokenPrefix: process.env.UPLOADTHING_TOKEN
      ? process.env.UPLOADTHING_TOKEN.slice(0, 20)
      : null,
  })
}
