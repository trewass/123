'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Eye, Download, Share2 } from 'lucide-react'

interface MediaFile {
  name: string
  path: string
  size?: number
  type: string
  webPath?: string
}

interface MediaGalleryProps {
  files?: MediaFile[]
  title?: string
  description?: string
}

export default function MediaGallery({ files = [], title, description }: MediaGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<MediaFile | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [images, setImages] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Загрузка реальных изображений
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/media/images')
        if (response.ok) {
          const data = await response.json()
          setImages(data.images)
        } else {
          setError('Ошибка загрузки изображений')
        }
      } catch (err) {
        setError('Ошибка загрузки изображений')
        console.error('Error fetching images:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  const handleImageClick = (file: MediaFile) => {
    setSelectedImage(file)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedImage(null)
  }

  const handleDownload = (file: MediaFile) => {
    const link = document.createElement('a')
    link.href = file.webPath || file.path
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const displayFiles = files.length > 0 ? files : images

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
          <p className="text-neutral-300">Загрузка изображений...</p>
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

      {/* Сетка изображений */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayFiles.map((file, index) => (
          <motion.div
            key={file.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative aspect-[4/3] bg-background-surface border border-neutral-800 rounded-lg overflow-hidden cursor-pointer hover:border-accent-500/50 transition-all duration-300"
            onClick={() => handleImageClick(file)}
          >
            {/* Реальное изображение */}
            <Image
              src={file.webPath || file.path}
              alt={file.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* Overlay с действиями */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
              <button 
                className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  handleImageClick(file)
                }}
              >
                <Eye className="w-5 h-5" />
              </button>
              <button 
                className="bg-accent-500 text-white p-2 rounded-lg hover:bg-accent-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDownload(file)
                }}
              >
                <Download className="w-5 h-5" />
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Информация о файле */}
            <div className="absolute bottom-2 left-2 right-2">
              <div className="bg-black/50 backdrop-blur-sm rounded px-2 py-1">
                <p className="text-white text-xs truncate">{file.name}</p>
                {file.size && (
                  <p className="text-neutral-400 text-xs">
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        </div>
      )}

      {/* Модальное окно для просмотра изображения */}
      {showModal && selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-background-surface border border-neutral-800 rounded-xl max-w-6xl w-full max-h-[90vh] relative"
          >
            <div className="flex items-center justify-between p-6 border-b border-neutral-800">
              <h3 className="text-xl font-medium text-white">
                {selectedImage.name}
              </h3>
              <button
                onClick={closeModal}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={selectedImage.webPath || selectedImage.path}
                  alt={selectedImage.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
                />
              </div>
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={() => handleDownload(selectedImage)}
                  className="flex items-center space-x-2 bg-accent-500 text-white px-4 py-2 rounded-lg hover:bg-accent-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Скачать</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
} 