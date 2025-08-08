'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ExternalLink, Play, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// Данные проектов
const projectsData = {
  'kitchen-moscow': {
    title: 'Кухня в Москве',
    subtitle: 'Современная кухня с продуманной эргономикой',
    location: 'Москва',
    year: '2024',
    area: '12 м²',
    description: 'Проект современной кухни с точным планированием всех подключений и мебели. План учитывает расположение бытовой техники, освещения и сантехники для максимального удобства использования.',
    details: [
      'Розетка для ПММ справа от неё, а не за ней',
      'Высота фартука 60 см от столешницы',
      'Розетки на фартуке на высоте 1.1 м от пола',
      'Освещение рабочей зоны LED-лентой',
      'Вывод воды для посудомоечной машины',
      'Вентиляция вытяжки через потолок'
    ],
    images: [
      { id: 1, type: 'image', alt: 'План розеток' },
      { id: 2, type: 'image', alt: '3D визуализация кухни' },
      { id: 3, type: 'image', alt: 'Детали мебели' },
      { id: 4, type: 'image', alt: 'Готовая кухня' }
    ]
  },
  'bathroom-sochi': {
    title: 'Ванная в Сочи',
    subtitle: 'Премиальная ванная комната',
    location: 'Сочи',
    year: '2024',
    area: '8 м²',
    description: 'Роскошная ванная комната с панорамным видом на море. Проект включает премиальную сантехнику и продуманную систему освещения.',
    details: [
      'Панорамное остекление с видом на море',
      'Премиальная сантехника и аксессуары',
      'Система скрытого освещения',
      'Влагостойкие материалы',
      'Система вентиляции',
      'Умное управление освещением'
    ],
    images: [
      { id: 1, type: 'image', alt: 'План ванной комнаты' },
      { id: 2, type: 'image', alt: '3D визуализация' },
      { id: 3, type: 'image', alt: 'Детали отделки' },
      { id: 4, type: 'image', alt: 'Готовая ванная комната' }
    ]
  },
  'bedroom-ekb': {
    title: 'Спальня в Екатеринбурге',
    subtitle: 'Минималистичная спальня',
    location: 'Екатеринбург',
    year: '2024',
    area: '16 м²',
    description: 'Современная спальня в стиле минимализм с встроенной гардеробной и продуманной системой освещения.',
    details: [
      'Встроенная гардеробная система',
      'Многоуровневое освещение',
      'Минималистичная мебель',
      'Система хранения',
      'Уютная атмосфера',
      'Функциональное зонирование'
    ],
    images: [
      { id: 1, type: 'image', alt: 'План спальни' },
      { id: 2, type: 'image', alt: '3D визуализация спальни' },
      { id: 3, type: 'image', alt: 'Гардеробная система' },
      { id: 4, type: 'image', alt: 'Готовая спальня' }
    ]
  },
  'kids-room-kazan': {
    title: 'Детская в Казани',
    subtitle: 'Многофункциональная детская',
    location: 'Казань',
    year: '2024',
    area: '14 м²',
    description: 'Детская комната для растущего ребенка с трансформируемой мебелью и продуманной системой хранения.',
    details: [
      'Модульная мебель с возможностью трансформации',
      'Отдельные зоны для игр и учебы',
      'Система хранения с ящиками и корзинами',
      'Безопасные материалы',
      'Яркое освещение',
      'Эргономичная мебель'
    ],
    images: [
      { id: 1, type: 'image', alt: 'План детской комнаты' },
      { id: 2, type: 'image', alt: '3D визуализация детской' },
      { id: 3, type: 'image', alt: 'Игровая зона' },
      { id: 4, type: 'image', alt: 'Готовая детская комната' }
    ]
  },
  'living-room-spb': {
    title: 'Гостиная в СПб',
    subtitle: 'Современная гостиная',
    location: 'Санкт-Петербург',
    year: '2024',
    area: '20 м²',
    description: 'Просторная гостиная с зонированием и многофункциональной мебелью.',
    details: [
      'Зонирование пространства',
      'Многофункциональная мебель',
      'Система освещения',
      'Зона отдыха',
      'Рабочая зона',
      'Система хранения'
    ],
    images: [
      { id: 1, type: 'image', alt: 'План гостиной' },
      { id: 2, type: 'image', alt: '3D визуализация гостиной' },
      { id: 3, type: 'image', alt: 'Зона отдыха' },
      { id: 4, type: 'image', alt: 'Готовая гостиная' }
    ]
  },
  'office-novosibirsk': {
    title: 'Офис в Новосибирске',
    subtitle: 'Современный офис',
    location: 'Новосибирск',
    year: '2024',
    area: '45 м²',
    description: 'Функциональный офис с продуманной системой хранения и рабочими зонами.',
    details: [
      'Рабочие зоны',
      'Система хранения',
      'Зона отдыха',
      'Конференц-зона',
      'Освещение рабочего места',
      'Эргономичная мебель'
    ],
    images: [
      { id: 1, type: 'image', alt: 'План офиса' },
      { id: 2, type: 'image', alt: '3D визуализация офиса' },
      { id: 3, type: 'image', alt: 'Рабочие зоны' },
      { id: 4, type: 'image', alt: 'Готовый офис' }
    ]
  },
  'kitchen-ekb': {
    title: 'Кухня в Екатеринбурге',
    subtitle: 'Классическая кухня',
    location: 'Екатеринбург',
    year: '2024',
    area: '15 м²',
    description: 'Классическая кухня с современными технологиями и эргономичным планированием.',
    details: [
      'Классический стиль',
      'Современные технологии',
      'Эргономичное планирование',
      'Система хранения',
      'Рабочая зона',
      'Зона приема гостей'
    ],
    images: [
      { id: 1, type: 'image', alt: 'План кухни' },
      { id: 2, type: 'image', alt: '3D визуализация кухни' },
      { id: 3, type: 'image', alt: 'Детали мебели' },
      { id: 4, type: 'image', alt: 'Готовая кухня' }
    ]
  },
  'bathroom-moscow': {
    title: 'Ванная в Москве',
    subtitle: 'Современная ванная',
    location: 'Москва',
    year: '2024',
    area: '6 м²',
    description: 'Компактная ванная комната с максимальным использованием пространства.',
    details: [
      'Максимальное использование пространства',
      'Компактная сантехника',
      'Система хранения',
      'Освещение',
      'Вентиляция',
      'Влагостойкие материалы'
    ],
    images: [
      { id: 1, type: 'image', alt: 'План ванной комнаты' },
      { id: 2, type: 'image', alt: '3D визуализация' },
      { id: 3, type: 'image', alt: 'Детали отделки' },
      { id: 4, type: 'image', alt: 'Готовая ванная комната' }
    ]
  },
  'bedroom-kazan': {
    title: 'Спальня в Казани',
    subtitle: 'Уютная спальня',
    location: 'Казань',
    year: '2024',
    area: '18 м²',
    description: 'Уютная спальня с гардеробной и продуманной системой освещения.',
    details: [
      'Уютная атмосфера',
      'Гардеробная система',
      'Система освещения',
      'Зона отдыха',
      'Система хранения',
      'Функциональная мебель'
    ],
    images: [
      { id: 1, type: 'image', alt: 'План спальни' },
      { id: 2, type: 'image', alt: '3D визуализация спальни' },
      { id: 3, type: 'image', alt: 'Гардеробная система' },
      { id: 4, type: 'image', alt: 'Готовая спальня' }
    ]
  }
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const project = projectsData[params.id as keyof typeof projectsData]

  if (!project) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-neutral-200 mb-4">Проект не найден</h1>
          <Link href="/" className="btn-primary">
            Вернуться на главную
          </Link>
        </div>
      </div>
    )
  }

  const handleImageClick = (index: number) => {
    setSelectedImage(index)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))
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
                {project.title}
              </h1>
              <p className="text-sm sm:text-base text-neutral-400">
                {project.location}, {project.year}
              </p>
            </div>

            {/* Метаданные проекта */}
            <div className="bg-background-surface/30 border border-neutral-800 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-400">Проект:</span>
                  <span className="text-sm text-neutral-200 font-medium">{project.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-400">Город:</span>
                  <span className="text-sm text-neutral-200 font-medium">{project.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-400">Площадь:</span>
                  <span className="text-sm text-neutral-200 font-medium">{project.area}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-400">Год:</span>
                  <span className="text-sm text-neutral-200 font-medium">{project.year}</span>
                </div>
              </div>
            </div>

            {/* Описание проекта */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-medium text-neutral-200">
                Описание проекта
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Детали проекта */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-medium text-neutral-200">
                Особенности проекта
              </h3>
              <div className="space-y-2">
                {project.details.map((detail, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Кнопка заказа */}
            <div className="space-y-3">
              <button 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('openContactModal'))
                }}
                className="btn-primary w-full text-sm sm:text-base px-6 py-3 flex items-center justify-center space-x-2 hover:scale-105 transition-transform"
              >
                <span>Заказать похожий проект</span>
                <ExternalLink className="w-4 h-4" />
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
                      <ImageIcon className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg sm:text-xl text-white font-medium">
                        {project.images[0].alt}
                      </p>
                      <p className="text-sm sm:text-base text-white/80">
                        Нажмите для просмотра
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Счетчик изображений */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-xs text-white">
                    Фото 1 из {project.images.length}
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
                {project.images.map((image, index) => (
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
                            <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
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
                  эргономике и удобству использования. План учитывает расположение 
                  бытовой техники, а рендер показывает, как будет выглядеть интерьер в реальности.
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
                    <ImageIcon className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl sm:text-2xl text-white font-medium">
                      {project.images[selectedImage].alt}
                    </p>
                    <p className="text-sm sm:text-base text-white/80">
                      {selectedImage + 1} из {project.images.length}
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
