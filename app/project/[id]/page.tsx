'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Download, ExternalLink, Play, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// Данные проектов (в реальном приложении это будет API)
const projectsData = {
  'demo': {
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
    ],
    images: [
      { id: 1, type: 'image', alt: 'План розеток' },
      { id: 2, type: 'image', alt: 'Рендер кухни' },
      { id: 3, type: 'image', alt: 'Деталь кухни' },
      { id: 4, type: 'image', alt: 'Деталь мебели' },
      { id: 5, type: 'video', alt: 'Обзор кухни' },
      { id: 6, type: 'image', alt: 'План освещения' },
      { id: 7, type: 'image', alt: 'План сантехники' },
      { id: 8, type: 'image', alt: 'Расположение техники' },
      { id: 9, type: 'image', alt: 'Деталь шкафов' },
      { id: 10, type: 'image', alt: 'Деталь столешницы' },
      { id: 11, type: 'image', alt: 'Зона мойки' },
      { id: 12, type: 'image', alt: 'Зона готовки' },
      { id: 13, type: 'image', alt: 'Зона хранения' },
      { id: 14, type: 'image', alt: 'Финальный результат' }
    ]
  },
  'timur-bakhchisaray': {
    title: 'Тимур Бахчисарай',
    location: 'Бахчисарай',
    year: '2024',
    type: 'Жилой проект',
    description: 'Проект кухни в стиле минимализм с акцентом на функциональность и эргономику. Особое внимание уделено организации рабочего пространства.',
    details: [
      'Минималистичный дизайн с акцентом на функциональность',
      'Эргономичное расположение техники',
      'Современные материалы отделки',
      'Продуманная система освещения',
      'Оптимальное использование пространства',
      'Интеграция бытовой техники'
    ],
    images: [
      { id: 1, type: 'image', alt: 'Общий вид кухни' },
      { id: 2, type: 'image', alt: 'Зона готовки' },
      { id: 3, type: 'image', alt: 'Зона мойки' },
      { id: 4, type: 'image', alt: 'Детали мебели' },
      { id: 5, type: 'video', alt: 'Обзор проекта' },
      { id: 6, type: 'image', alt: 'План размещения' },
      { id: 7, type: 'image', alt: 'План освещения' },
      { id: 8, type: 'image', alt: 'Детали проекта' }
    ]
  },
  'kitchen-modern': {
    title: 'Проект кухни - Современный стиль',
    location: 'Москва',
    year: '2024',
    type: 'Жилой проект',
    description: 'Проект современной кухни с точным планированием всех подключений и мебели. Особое внимание уделено эргономике рабочего пространства и удобству использования.',
    details: [
      'Розетки для техники на оптимальной высоте',
      'Вывод воды для посудомоечной машины',
      'Освещение рабочей зоны LED-лентой',
      'Вентиляция вытяжки через потолок',
      'Фартук из керамогранита 60 см',
      'Столешница из искусственного камня'
    ],
    images: [
      { id: 1, type: 'image', alt: 'План розеток' },
      { id: 2, type: 'image', alt: 'Рендер кухни' },
      { id: 3, type: 'image', alt: 'Деталь кухни' },
      { id: 4, type: 'image', alt: 'Деталь мебели' },
      { id: 5, type: 'video', alt: 'Обзор кухни' },
      { id: 6, type: 'image', alt: 'План освещения' },
      { id: 7, type: 'image', alt: 'План сантехники' },
      { id: 8, type: 'image', alt: 'Расположение техники' },
      { id: 9, type: 'image', alt: 'Деталь шкафов' },
      { id: 10, type: 'image', alt: 'Деталь столешницы' },
      { id: 11, type: 'image', alt: 'Зона мойки' },
      { id: 12, type: 'image', alt: 'Зона готовки' },
      { id: 13, type: 'image', alt: 'Зона хранения' },
      { id: 14, type: 'image', alt: 'Финальный результат' }
    ]
  },
  'living-classic': {
    title: 'Гостиная - Классический интерьер',
    location: 'Санкт-Петербург',
    year: '2024',
    type: 'Жилой проект',
    description: 'Классическая гостиная с элегантным дизайном и продуманной планировкой. Проект учитывает все нюансы классического стиля.',
    details: [
      'Декоративная лепнина на потолке',
      'Паркетный пол из дуба',
      'Классические люстры и бра',
      'Каминная зона с отделкой',
      'Встроенная система хранения',
      'Текстильное оформление окон'
    ],
    images: [
      { id: 1, type: 'image', alt: 'Общий вид гостиной' },
      { id: 2, type: 'image', alt: 'Каминная зона' },
      { id: 3, type: 'image', alt: 'Зона отдыха' },
      { id: 4, type: 'image', alt: 'Детали отделки' },
      { id: 5, type: 'video', alt: 'Обзор гостиной' },
      { id: 6, type: 'image', alt: 'План освещения' },
      { id: 7, type: 'image', alt: 'Детали мебели' },
      { id: 8, type: 'image', alt: 'Текстиль' }
    ]
  },
  'bedroom-minimal': {
    title: 'Спальня - Минимализм',
    location: 'Екатеринбург',
    year: '2024',
    type: 'Жилой проект',
    description: 'Минималистичная спальня с акцентом на функциональность и спокойную атмосферу. Проект создан для максимального комфорта.',
    details: [
      'Встроенная система хранения',
      'Скрытое освещение',
      'Нейтральная цветовая палитра',
      'Функциональная зона отдыха',
      'Встроенная подсветка',
      'Минималистичная мебель'
    ],
    images: [
      { id: 1, type: 'image', alt: 'Общий вид спальни' },
      { id: 2, type: 'image', alt: 'Зона сна' },
      { id: 3, type: 'image', alt: 'Система хранения' },
      { id: 4, type: 'image', alt: 'Освещение' },
      { id: 5, type: 'video', alt: 'Обзор спальни' },
      { id: 6, type: 'image', alt: 'План размещения' },
      { id: 7, type: 'image', alt: 'Детали мебели' },
      { id: 8, type: 'image', alt: 'Текстиль' }
    ]
  },
  'bathroom-lux': {
    title: 'Ванная комната - Люкс',
    location: 'Сочи',
    year: '2024',
    type: 'Жилой проект',
    description: 'Премиальная ванная комната с использованием элитных материалов и современного оборудования. Проект создан для максимального комфорта.',
    details: [
      'Мраморная отделка стен',
      'Двухконтурная система отопления',
      'Встроенная система вентиляции',
      'Премиальная сантехника',
      'Подсветка зеркал',
      'Система "умный дом"'
    ],
    images: [
      { id: 1, type: 'image', alt: 'Общий вид ванной' },
      { id: 2, type: 'image', alt: 'Зона душа' },
      { id: 3, type: 'image', alt: 'Сантехника' },
      { id: 4, type: 'image', alt: 'Отделка' },
      { id: 5, type: 'video', alt: 'Обзор ванной' },
      { id: 6, type: 'image', alt: 'План сантехники' },
      { id: 7, type: 'image', alt: 'Освещение' },
      { id: 8, type: 'image', alt: 'Детали' }
    ]
  },
  'kids-play': {
    title: 'Детская комната - Игровая зона',
    location: 'Казань',
    year: '2024',
    type: 'Жилой проект',
    description: 'Детская комната с продуманной игровой зоной и безопасной мебелью. Проект учитывает все потребности ребенка.',
    details: [
      'Безопасная мебель без острых углов',
      'Игровая зона с мягким покрытием',
      'Встроенная система хранения игрушек',
      'Регулируемое освещение',
      'Экологичные материалы',
      'Трансформируемая мебель'
    ],
    images: [
      { id: 1, type: 'image', alt: 'Общий вид детской' },
      { id: 2, type: 'image', alt: 'Игровая зона' },
      { id: 3, type: 'image', alt: 'Зона сна' },
      { id: 4, type: 'image', alt: 'Система хранения' },
      { id: 5, type: 'video', alt: 'Обзор детской' },
      { id: 6, type: 'image', alt: 'План размещения' },
      { id: 7, type: 'image', alt: 'Освещение' },
      { id: 8, type: 'image', alt: 'Безопасность' }
    ]
  },
  'office-professional': {
    title: 'Рабочий кабинет - Профессиональный',
    location: 'Новосибирск',
    year: '2024',
    type: 'Жилой проект',
    description: 'Профессиональный рабочий кабинет с эргономичной мебелью и современными технологиями. Проект создан для максимальной продуктивности.',
    details: [
      'Эргономичное рабочее место',
      'Система управления освещением',
      'Встроенная система хранения документов',
      'Технологическая зона',
      'Зона для встреч',
      'Система кондиционирования'
    ],
    images: [
      { id: 1, type: 'image', alt: 'Общий вид кабинета' },
      { id: 2, type: 'image', alt: 'Рабочая зона' },
      { id: 3, type: 'image', alt: 'Зона встреч' },
      { id: 4, type: 'image', alt: 'Система хранения' },
      { id: 5, type: 'video', alt: 'Обзор кабинета' },
      { id: 6, type: 'image', alt: 'План размещения' },
      { id: 7, type: 'image', alt: 'Освещение' },
      { id: 8, type: 'image', alt: 'Технологии' }
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

  const handleOrderProject = () => {
    // Здесь можно добавить логику для открытия модального окна заказа
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleContact = () => {
    // Здесь можно добавить логику для открытия формы контактов
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
                  <span className="text-sm text-neutral-400">Тип:</span>
                  <span className="text-sm text-neutral-200 font-medium">{project.type}</span>
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

            {/* Детали плана */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-medium text-neutral-200">
                Ключевые особенности плана
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
