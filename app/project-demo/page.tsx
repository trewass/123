'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Download, ExternalLink, Play, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function ProjectDemoPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const projectImages = [
    { id: 1, type: 'image', src: '/images/plan-rosets.jpg', alt: 'План розеток' },
    { id: 2, type: 'image', src: '/images/kitchen-render.jpg', alt: 'Рендер кухни' },
    { id: 3, type: 'image', src: '/images/kitchen-detail.jpg', alt: 'Деталь кухни' },
    { id: 4, type: 'image', src: '/images/furniture-detail.jpg', alt: 'Деталь мебели' },
    { id: 5, type: 'video', src: '/videos/kitchen-walkthrough.mp4', alt: 'Обзор кухни' },
    { id: 6, type: 'image', src: '/images/lighting-plan.jpg', alt: 'План освещения' },
    { id: 7, type: 'image', src: '/images/plumbing-plan.jpg', alt: 'План сантехники' },
    { id: 8, type: 'image', src: '/images/appliance-layout.jpg', alt: 'Расположение техники' },
    { id: 9, type: 'image', src: '/images/cabinet-detail.jpg', alt: 'Деталь шкафов' },
    { id: 10, type: 'image', src: '/images/countertop-detail.jpg', alt: 'Деталь столешницы' },
    { id: 11, type: 'image', src: '/images/sink-area.jpg', alt: 'Зона мойки' },
    { id: 12, type: 'image', src: '/images/cooking-area.jpg', alt: 'Зона готовки' },
    { id: 13, type: 'image', src: '/images/storage-area.jpg', alt: 'Зона хранения' },
    { id: 14, type: 'image', src: '/images/final-result.jpg', alt: 'Финальный результат' }
  ]

  const projectData = {
    title: 'Кухня в современном стиле',
    location: 'Москва',
    year: '2024',
    type: 'Жилой проект',
    description: 'Проект современной кухни с точным планированием всех подключений и мебели. План учитывает расположение техники, освещения и сантехники для максимального удобства использования.',
    details: [
      'Розетка для ПММ справа от неё, а не за ней',
      'Высота фартука 60 см от столешницы',
      'Розетки на фартуке на высоте 1.1 м от пола',
      'Освещение рабочей зоны LED-лентой',
      'Вывод воды для посудомоечной машины',
      'Вентиляция вытяжки через потолок'
    ]
  }

  const handleImageClick = (index: number) => {
    setSelectedImage(index)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? projectImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev === projectImages.length - 1 ? 0 : prev + 1))
  }

  const handleOrderProject = () => {
    // Открываем модальное окно контактов через событие
    window.dispatchEvent(new CustomEvent('openContactModal'))
  }

  const handleContact = () => {
    // Открываем модальное окно контактов через событие
    window.dispatchEvent(new CustomEvent('openContactModal'))
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-background-primary via-background-secondary to-background-primary" />
      
      {/* Декоративные элементы */}
      <div className="absolute top-20 right-4 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-4 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 bg-accent-600/5 rounded-full blur-3xl" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Навигация */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-neutral-400 hover:text-accent-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Вернуться на главную</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Левая колонка - информация о проекте */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Заголовок проекта */}
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-light leading-tight">
                {projectData.title}
              </h1>
              <p className="text-sm sm:text-base text-neutral-400">
                {projectData.location}, {projectData.year}
              </p>
            </div>

            {/* Метаданные проекта */}
            <div className="bg-background-surface/30 border border-neutral-800 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-400">Проект:</span>
                  <span className="text-sm text-neutral-200 font-medium">{projectData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-400">Город:</span>
                  <span className="text-sm text-neutral-200 font-medium">{projectData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-400">Тип:</span>
                  <span className="text-sm text-neutral-200 font-medium">{projectData.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-400">Год:</span>
                  <span className="text-sm text-neutral-200 font-medium">{projectData.year}</span>
                </div>
              </div>
            </div>

            {/* Описание проекта */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-medium text-neutral-200">
                Описание проекта
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                {projectData.description}
              </p>
            </div>

            {/* Детали плана */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-medium text-neutral-200">
                Ключевые особенности плана
              </h3>
              <div className="space-y-2">
                {projectData.details.map((detail, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="space-y-3">
              <button 
                onClick={handleOrderProject}
                className="btn-primary w-full text-sm sm:text-base px-6 py-3 flex items-center justify-center space-x-2 hover:scale-105 transition-transform"
              >
                <span>Заказать похожий проект</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              <button 
                onClick={handleContact}
                className="btn-secondary w-full text-sm sm:text-base px-6 py-3 flex items-center justify-center space-x-2 hover:scale-105 transition-transform"
              >
                <span>Связаться с нами</span>
              </button>
            </div>
          </motion.div>

          {/* Правая колонка - галерея */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Главное изображение */}
            <div className="bg-background-surface/50 border border-neutral-800 rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
              <div 
                className="aspect-video bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-xl overflow-hidden relative cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => handleImageClick(0)}
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-orange-500/30 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                      <span className="text-white text-4xl sm:text-5xl">📋</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg sm:text-xl text-white font-medium">
                        План розеток и подключений
                      </p>
                      <p className="text-sm sm:text-base text-white/80">
                        Точное расположение всех элементов
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Счетчик изображений */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-xs text-white">
                    Фото 1 из {projectImages.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Галерея миниатюр */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-medium text-neutral-200">
                Фотографии проекта
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
                {projectImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="aspect-square bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 relative"
                    onClick={() => handleImageClick(index)}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-orange-500/20 flex items-center justify-center">
                      {image.type === 'video' ? (
                        <div className="text-center space-y-2">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 border border-white/30 rounded-full flex items-center justify-center mx-auto">
                            <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </div>
                          <p className="text-xs text-white/80">Видео</p>
                        </div>
                      ) : (
                        <div className="text-center space-y-2">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 border border-white/30 rounded-full flex items-center justify-center mx-auto">
                            <span className="text-white text-lg">📷</span>
                          </div>
                          <p className="text-xs text-white/80">Фото</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* История проекта */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-medium text-neutral-200">
                История проекта
              </h3>
              <div className="bg-background-surface/30 border border-neutral-800 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  Проект был разработан с учетом всех пожеланий клиента. Особое внимание уделено 
                  эргономике и удобству использования. План розеток учитывает расположение 
                  бытовой техники, а рендер показывает, как будет выглядеть кухня в реальности.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Модальное окно для просмотра изображений */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleModalClose}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-background-surface/90 border border-neutral-800 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Кнопка закрытия */}
              <button
                onClick={handleModalClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Навигационные кнопки */}
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>

              {/* Изображение */}
              <div className="aspect-video bg-gradient-to-br from-accent-500/20 to-accent-600/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                    <span className="text-white text-6xl sm:text-7xl">📋</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl sm:text-2xl text-white font-medium">
                      {projectImages[selectedImage].alt}
                    </p>
                    <p className="text-sm sm:text-base text-white/80">
                      {selectedImage + 1} из {projectImages.length}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
