import { NextRequest } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const imagePath = path.join(process.cwd(), 'public', 'images', ...params.path)
    
    const imageBuffer = await readFile(imagePath)
    
    // Определяем MIME тип на основе расширения файла
    const ext = path.extname(params.path[params.path.length - 1]).toLowerCase()
    let contentType = 'image/png' // по умолчанию
    
    if (ext === '.jpg' || ext === '.jpeg') {
      contentType = 'image/jpeg'
    } else if (ext === '.gif') {
      contentType = 'image/gif'
    } else if (ext === '.webp') {
      contentType = 'image/webp'
    }
    
    // Используем новый Response с Uint8Array - гарантированно работает на Vercel
    return new Response(new Uint8Array(imageBuffer), {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Ошибка загрузки изображения:', error)
    return new Response(
      JSON.stringify({ error: 'Изображение не найдено' }),
      { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
