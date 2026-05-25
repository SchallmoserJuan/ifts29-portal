import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    blobTokenExists: !!process.env.BLOB_READ_WRITE_TOKEN,
    blobTokenPrefix: process.env.BLOB_READ_WRITE_TOKEN
      ? process.env.BLOB_READ_WRITE_TOKEN.slice(0, 20)
      : null,
  })
}
