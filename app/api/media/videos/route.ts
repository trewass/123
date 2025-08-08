import { NextResponse } from 'next/server'
import { getVideoFiles } from '@/lib/media'

export async function GET() {
  try {
    const videos = getVideoFiles('public/videos')
    
    // Фильтруем только реальные видео файлы
    const validVideos = videos.filter(video => 
      !video.name.includes('placeholder') && 
      !video.name.includes('.DS_Store') &&
      (video.name.toLowerCase().endsWith('.mp4') || video.name.toLowerCase().endsWith('.webm') || video.name.toLowerCase().endsWith('.mov'))
    )

    // Добавляем превью для каждого видео
    const videosWithThumbnails = validVideos.map((video, index) => {
      // Используем разные превью для разных видео
      const thumbnailIndex = (index % 2) + 1
      const thumbnail = `/images/video-thumbnail-${thumbnailIndex}.jpg`
      
      return {
        ...video,
        webPath: `/videos/${video.name}`,
        thumbnail: thumbnail,
        // Добавляем примерную длительность для MOV файлов
        duration: video.name.endsWith('.MOV') ? 120 : video.duration || 60
      }
    })

    return NextResponse.json({
      success: true,
      files: videosWithThumbnails
    })
  } catch (error) {
    console.error('Error getting videos:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении видео' },
      { status: 500 }
    )
  }
} 