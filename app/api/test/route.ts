import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS ? '***SET***' : '***NOT SET***',
    emailTo: process.env.EMAIL_TO,
    nodeEnv: process.env.NODE_ENV
  })
}
