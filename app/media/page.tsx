'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Image, Video, FileText } from 'lucide-react'
import MediaGallery from '@/components/MediaGallery'
import VideoPlayer from '@/components/VideoPlayer'
import DocumentsSection from '@/components/DocumentsSection'
import ContactModal from '@/components/ContactModal'

type TabType = 'images' | 'videos' | 'documents'

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<TabType>('images')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const tabs = [
    {
      id: 'images' as TabType,
      label: 'Изображения',
      icon: Image,
      description: '3D визуализации и дизайн-проекты мебели'
    },
    {
      id: 'videos' as TabType,
      label: 'Видео',
      icon: Video,
      description: 'Видео-обзоры и 3D туры по проектам'
    },
    {
      id: 'documents' as TabType,
      label: 'Документы',
      icon: FileText,
      description: 'Технические схемы и документация'
    }
  ]

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="container-max section-padding">
        {/* Заголовок страницы */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-light mb-6">
            Медиа <span className="gradient-text">материалы</span>
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Изучите наши проекты в деталях: 3D визуализации, видео-обзоры и техническая документация
          </p>
        </motion.div>

        {/* Табы навигации */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg border transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-accent-500 border-accent-500 text-white'
                    : 'bg-background-surface border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            )
          })}
        </motion.div>

        {/* Контент табов */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'images' && (
            <MediaGallery
              title="3D визуализации и дизайн-проекты"
              description="Изучите детально каждый проект с возможностью просмотра в полном размере"
            />
          )}

          {activeTab === 'videos' && (
            <VideoPlayer
              title="Видео-обзоры проектов"
              description="Погрузитесь в наши проекты с помощью видео-туров и 3D анимаций"
            />
          )}

          {activeTab === 'documents' && (
            <DocumentsSection />
          )}
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
                  Получите полный доступ к материалам
                </h3>
                <p className="text-neutral-300">
                  Оставьте контакты и получите доступ к полной библиотеке проектов, 
                  включая технические схемы, 3D модели и видео-обзоры.
                </p>
                <ul className="space-y-2 text-sm text-neutral-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-accent-500">✓</span>
                    <span>Полные технические схемы коммуникаций</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent-500">✓</span>
                    <span>3D визуализации в высоком качестве</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent-500">✓</span>
                    <span>Видео-туры по реализованным проектам</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent-500">✓</span>
                    <span>Техническая документация для строителей</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Получить доступ к материалам
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Получить доступ к материалам"
        description="Оставьте контакты и получите доступ к полной библиотеке проектов"
      />
    </div>
  )
} 