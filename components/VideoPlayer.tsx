'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize, Download, Share2, Video } from 'lucide-react'
import Image from 'next/image'

interface VideoFile {
  name: string
  path: string
  size?: number
  type: string
  duration?: number
  thumbnail?: string
}

interface VideoPlayerProps {
  files?: VideoFile[]
  title?: string
  description?: string
}

export default function VideoPlayer({ files = [], title, description }: VideoPlayerProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoFile | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [videos, setVideos] = useState<VideoFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Загрузка видео
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/media/videos')
        if (response.ok) {
          const data = await response.json()
          setVideos(data.files)
        } else {
          setError('Ошибка загрузки видео')
        }
      } catch (err) {
        setError('Ошибка загрузки видео')
        console.error('Error fetching videos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  const handleVideoSelect = (video: VideoFile) => {
    setSelectedVideo(video)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const handleDownload = (video: VideoFile) => {
    const link = document.createElement('a')
    link.href = video.path
    link.download = video.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const displayFiles = files.length > 0 ? files : videos

  return (
    <div className="space-y-6">
      {title && (
        <div className="text-center">
          <h2 className="text-2xl font-medium text-white mb-2">{title}</h2>
          {description && (
            <p className="text-neutral-300">{description}</p>
          )}
        </div>
      )}

      {/* Состояние загрузки */}
      {loading && (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-300">Загрузка видео...</p>
        </div>
      )}

      {/* Состояние ошибки */}
      {error && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <p className="text-red-400 mb-2">Ошибка загрузки</p>
          <p className="text-neutral-400 text-sm">{error}</p>
        </div>
      )}

      {/* Контент видео плеера */}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Видео плеер */}
          <div className="space-y-4">
            <div className="bg-background-surface border border-neutral-800 rounded-lg overflow-hidden">
              {selectedVideo ? (
                <div className="relative">
                  <video
                    ref={videoRef}
                    className="w-full aspect-video bg-black"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src={selectedVideo.path} type={selectedVideo.type} />
                    Ваш браузер не поддерживает видео.
                  </video>

                  {/* Overlay с кнопками управления */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button
                      onClick={togglePlay}
                      className="bg-black/50 backdrop-blur-sm text-white p-4 rounded-full hover:bg-black/70 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                    </button>
                  </div>

                  {/* Прогресс бар */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex items-center justify-between mt-2 text-white text-sm">
                      <span>{formatTime(currentTime)}</span>
                      <div className="flex items-center space-x-2">
                        <button onClick={toggleMute} className="hover:text-accent-400 transition-colors">
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <button onClick={handleFullscreen} className="hover:text-accent-400 transition-colors">
                          <Maximize className="w-4 h-4" />
                        </button>
                      </div>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-neutral-600/20 to-neutral-700/20 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-accent-500/20 border border-accent-500/30 rounded-lg flex items-center justify-center mx-auto">
                      <Play className="w-8 h-8 text-accent-500" />
                    </div>
                    <p className="text-neutral-300">Выберите видео для воспроизведения</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Список видео */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Доступные видео</h3>
            <div className="space-y-3">
              {displayFiles.map((video, index) => (
                <motion.div
                  key={video.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group cursor-pointer rounded-lg border transition-all duration-200 ${
                    selectedVideo?.name === video.name
                      ? 'border-accent-500 bg-accent-500/10'
                      : 'border-neutral-800 bg-background-surface hover:border-neutral-700'
                  }`}
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      {/* Превью */}
                      <div className="relative w-20 h-12 bg-neutral-800 rounded overflow-hidden flex-shrink-0">
                        {video.thumbnail ? (
                          <Image
                            src={video.thumbnail}
                            alt={video.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Video className="w-6 h-6 text-neutral-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      {/* Информация */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm truncate">
                          {video.name}
                        </h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-neutral-400 text-xs">
                            {video.type.toUpperCase()}
                          </span>
                          {video.size && (
                            <span className="text-neutral-400 text-xs">
                              {(video.size / 1024 / 1024).toFixed(1)} MB
                            </span>
                          )}
                          {video.duration && (
                            <span className="text-neutral-400 text-xs">
                              {formatTime(video.duration)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Действия */}
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDownload(video)
                          }}
                          className="p-1 text-neutral-400 hover:text-accent-400 transition-colors"
                          title="Скачать"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-neutral-400 hover:text-accent-400 transition-colors"
                          title="Поделиться"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 