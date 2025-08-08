import { NextResponse } from 'next/server'
import { getImageFiles } from '@/lib/media'

export async function GET() {
  try {
    const images = getImageFiles('public/images')
    
    // Фильтруем только реальные изображения (убираем placeholder.txt и .DS_Store)
    const validImages = images.filter(img => 
      !img.name.includes('placeholder') && 
      !img.name.includes('.DS_Store') &&
      (img.name.endsWith('.jpg') || img.name.endsWith('.jpeg') || img.name.endsWith('.png') || img.name.endsWith('.webp'))
    )

    return NextResponse.json({
      success: true,
      images: validImages.map(img => ({
        ...img,
        webPath: `/images/${img.name}`,
        thumbnail: `/images/${img.name}`
      }))
    })
  } catch (error) {
    console.error('Error getting images:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении изображений' },
      { status: 500 }
    )
  }
} 