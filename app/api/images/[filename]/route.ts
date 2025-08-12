import { NextRequest, NextResponse } from 'next/server'
// Используем Node.js runtime, так как читаем файл с диска
export const runtime = 'nodejs'
import { readFile } from 'fs/promises'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename
    const imagePath = path.join(process.cwd(), 'public', 'images', filename)
    
    const imageBuffer = await readFile(imagePath)
    
    // Определяем MIME тип на основе расширения файла
    const ext = path.extname(filename).toLowerCase()
    let contentType = 'image/png' // по умолчанию
    
    if (ext === '.jpg' || ext === '.jpeg') {
      contentType = 'image/jpeg'
    } else if (ext === '.gif') {
      contentType = 'image/gif'
    } else if (ext === '.webp') {
      contentType = 'image/webp'
    }
    
    // Просто возвращаем Response с Buffer напрямую, без Blob
    return new Response(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Ошибка загрузки изображения:', error)
    return NextResponse.json(
      { error: 'Изображение не найдено' },
      { status: 404 }
    )
  }
}
