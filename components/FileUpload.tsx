'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, CheckCircle, AlertCircle, File, Image, Video, FileText } from 'lucide-react'

interface UploadedFile {
  name: string
  size: number
  type: string
  preview?: string
}

interface FileUploadProps {
  type: 'image' | 'video' | 'document'
  onUpload?: (files: UploadedFile[]) => void
  multiple?: boolean
  maxSize?: number // в байтах
  className?: string
}

export default function FileUpload({ 
  type, 
  onUpload, 
  multiple = false, 
  maxSize = 50 * 1024 * 1024, // 50MB по умолчанию
  className = '' 
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Получение иконки для типа файла
  const getTypeIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return Image
    if (fileType.startsWith('video/')) return Video
    return FileText
  }

  // Получение текста для типа файла
  const getTypeText = () => {
    switch (type) {
      case 'image':
        return 'Изображения (JPG, PNG, WebP)'
      case 'video':
        return 'Видео (MP4, WebM)'
      case 'document':
        return 'Документы (PDF, DOC, DOCX)'
      default:
        return 'Файлы'
    }
  }

  // Валидация файла
  const validateFile = (file: File): string | null => {
    // Проверка размера
    if (file.size > maxSize) {
      return `Файл слишком большой. Максимальный размер: ${(maxSize / 1024 / 1024).toFixed(1)}MB`
    }

    // Проверка типа
    const allowedTypes = {
      image: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
      video: ['video/mp4', 'video/webm'],
      document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    }

    if (!allowedTypes[type].includes(file.type)) {
      return `Неподдерживаемый формат файла. Разрешены: ${allowedTypes[type].join(', ')}`
    }

    return null
  }

  // Обработка файлов
  const handleFiles = useCallback(async (files: FileList) => {
    setError(null)
    setIsUploading(true)

    const validFiles: UploadedFile[] = []
    const errors: string[] = []

    for (const file of Array.from(files)) {
      const validationError = validateFile(file)
      
      if (validationError) {
        errors.push(`${file.name}: ${validationError}`)
        continue
      }

      // Создание preview для изображений
      let preview: string | undefined
      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file)
      }

      const uploadedFile: UploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        preview
      }

      validFiles.push(uploadedFile)
    }

    if (errors.length > 0) {
      setError(errors.join('\n'))
    }

    if (validFiles.length > 0) {
      const newFiles = multiple ? [...uploadedFiles, ...validFiles] : validFiles
      setUploadedFiles(newFiles)
      
      if (onUpload) {
        onUpload(newFiles)
      }

      // Здесь можно добавить реальную загрузку на сервер
      try {
        for (const file of validFiles) {
          const formData = new FormData()
          formData.append('file', file as any)
          formData.append('type', type)

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
          })

          if (!response.ok) {
            throw new Error(`Ошибка загрузки ${file.name}`)
          }
        }
      } catch (uploadError) {
        setError(`Ошибка загрузки: ${uploadError}`)
      }
    }

    setIsUploading(false)
  }, [type, maxSize, multiple, uploadedFiles, onUpload])

  // Drag & Drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  // Click handler
  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  // Удаление файла
  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
    if (onUpload) {
      onUpload(newFiles)
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Drag & Drop зона */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-accent-500 bg-accent-500/10'
            : 'border-neutral-700 hover:border-neutral-600'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={type === 'image' ? 'image/*' : type === 'video' ? 'video/*' : '.pdf,.doc,.docx'}
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="space-y-4">
          <div className="w-16 h-16 bg-accent-500/20 border border-accent-500/30 rounded-lg flex items-center justify-center mx-auto">
            <Upload className="w-8 h-8 text-accent-500" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-2">
              Перетащите файлы сюда или нажмите для выбора
            </h3>
            <p className="text-neutral-400">
              {getTypeText()}
            </p>
            <p className="text-sm text-neutral-500 mt-2">
              Максимальный размер: {(maxSize / 1024 / 1024).toFixed(1)}MB
            </p>
          </div>
        </div>

        {isUploading && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-white text-sm">Загрузка...</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Ошибки */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-4"
          >
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="text-red-400 text-sm whitespace-pre-line">{error}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Загруженные файлы */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-2"
          >
            <h4 className="text-white font-medium">Загруженные файлы:</h4>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => {
                const Icon = getTypeIcon(file.type)
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center space-x-3 p-3 bg-background-surface border border-neutral-800 rounded-lg"
                  >
                    <Icon className="w-5 h-5 text-accent-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{file.name}</p>
                      <p className="text-neutral-400 text-xs">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-neutral-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 