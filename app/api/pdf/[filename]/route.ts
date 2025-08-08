import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename
    
    // Путь к PDF файлу в папке public/documents
    const filePath = join(process.cwd(), 'public', 'documents', filename)
    
    // Читаем файл
    const fileBuffer = await readFile(filePath)
    
    // Возвращаем PDF с правильными заголовками
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Error serving PDF:', error)
    return new NextResponse('PDF not found', { status: 404 })
  }
} 