'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Image, Video, FileText } from 'lucide-react'
import FileUpload from '@/components/FileUpload'

type UploadType = 'image' | 'video' | 'document'

export default function UploadPage() {
  const [activeType, setActiveType] = useState<UploadType>('image')

  const uploadTypes = [
    {
      id: 'image' as UploadType,
      label: 'Изображения',
      icon: Image,
      description: 'Загрузите изображения проектов'
    },
    {
      id: 'video' as UploadType,
      label: 'Видео',
      icon: Video,
      description: 'Загрузите видео-обзоры'
    },
    {
      id: 'document' as UploadType,
      label: 'Документы',
      icon: FileText,
      description: 'Загрузите техническую документацию'
    }
  ]

  const handleUpload = (files: any[]) => {
    console.log('Uploaded files:', files)
    // Здесь можно добавить логику обработки загруженных файлов
  }

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="container-max section-padding">
        {/* Заголовок страницы */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            Загрузка <span className="gradient-text">файлов</span>
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Загрузите медиа файлы для ваших проектов: изображения, видео и документы
          </p>
        </motion.div>

        {/* Выбор типа загрузки */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {uploadTypes.map((type) => {
            const Icon = type.icon
            return (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-lg border transition-all duration-200 ${
                  activeType === type.id
                    ? 'bg-accent-500 border-accent-500 text-white'
                    : 'bg-background-surface border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">{type.label}</div>
                  <div className="text-xs opacity-75">{type.description}</div>
                </div>
              </button>
            )
          })}
        </motion.div>

        {/* Компонент загрузки */}
        <motion.div
          key={activeType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <FileUpload
            type={activeType}
            onUpload={handleUpload}
            multiple={true}
            maxSize={50 * 1024 * 1024} // 50MB
          />
        </motion.div>

        {/* Информационный блок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <div className="bg-background-surface/50 border border-neutral-800 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-medium text-white">
                  Возможности загрузки
                </h3>
                <ul className="space-y-2 text-sm text-neutral-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-accent-500">✓</span>
                    <span>Drag & Drop загрузка файлов</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent-500">✓</span>
                    <span>Поддержка множественной загрузки</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent-500">✓</span>
                    <span>Валидация типов и размеров файлов</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent-500">✓</span>
                    <span>Предварительный просмотр изображений</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent-500">✓</span>
                    <span>Прогресс загрузки и обработка ошибок</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Поддерживаемые форматы:</h4>
                <div className="space-y-2 text-sm text-neutral-300">
                  <div>
                    <strong>Изображения:</strong> JPG, JPEG, PNG, WebP
                  </div>
                  <div>
                    <strong>Видео:</strong> MP4, WebM, AVI
                  </div>
                  <div>
                    <strong>Документы:</strong> PDF, DOC, DOCX
                  </div>
                </div>
                <div className="text-xs text-neutral-400">
                  Максимальный размер файла: 50MB
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 