'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Download, ExternalLink, Play, X, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle, Star, Quote } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import ContactModal from '@/components/ContactModal'

// Данные кейсов
const casesData = {
  'kitchen-moscow-family': {
    title: 'Кухня для семьи в Москве',
    subtitle: 'Современная кухня с продуманной эргономикой',
    location: 'Москва',
    year: '2024',
    area: '12 м²',
    style: 'Современный',
    type: 'Кухня',
    problem: {
      title: 'Проблема',
      description: 'Семья из 4 человек нуждалась в функциональной кухне, где можно было бы готовить, принимать гостей и хранить все необходимые вещи.',
      issues: [
        'Недостаточно места для хранения',
        'Плохая эргономика рабочей зоны',
        'Отсутствие места для бытовой техники'
      ]
    },
    solution: {
      title: 'Решение',
      description: 'Разработали проект кухни с максимальным использованием пространства и продуманной системой хранения.',
      features: [
        'Встроенная техника для экономии места',
        'Система выдвижных ящиков и полок',
        'Удобная рабочая зона с правильной высотой'
      ]
    },
    result: {
      title: 'Результат',
      description: 'Кухня стала центром семейной жизни - здесь удобно готовить, принимать гостей и проводить время вместе.',
      achievements: [
        'Увеличено место для хранения на 40%',
        'Улучшена эргономика рабочей зоны',
        'Создано комфортное пространство для семьи'
      ],
      testimonial: {
        text: 'Теперь наша кухня - это не просто место для готовки, а настоящий семейный центр. Все продумано до мелочей!',
        author: 'Семья Петровых'
      }
    },
    images: [
      { id: 1, type: 'image', alt: 'План кухни' },
      { id: 2, type: 'image', alt: '3D визуализация кухни' },
      { id: 3, type: 'image', alt: 'Детали мебели' },
      { id: 4, type: 'image', alt: 'Готовая кухня' }
    ]
  },
  'bathroom-luxury-sochi': {
    title: 'Роскошная ванная в Сочи',
    subtitle: 'Премиальная ванная комната с панорамным видом',
    location: 'Сочи',
    year: '2024',
    area: '8 м²',
    style: 'Люкс',
    type: 'Ванная комната',
    problem: {
      title: 'Проблема',
      description: 'Владелец апартаментов в Сочи хотел создать роскошную ванную комнату с панорамным видом на море.',
      issues: [
        'Сложная планировка помещения',
        'Необходимость размещения премиальной техники',
        'Требования к влагостойкости материалов'
      ]
    },
    solution: {
      title: 'Решение',
      description: 'Создали проект ванной комнаты с использованием премиальных материалов и продуманной системой освещения.',
      features: [
        'Панорамное остекление с видом на море',
        'Премиальная сантехника и аксессуары',
        'Система скрытого освещения'
      ]
    },
    result: {
      title: 'Результат',
      description: 'Ванная комната стала настоящим спа-центром с потрясающим видом на море.',
      achievements: [
        'Создано премиальное пространство для отдыха',
        'Реализован панорамный вид на море',
        'Установлена высокотехнологичная сантехника'
      ],
      testimonial: {
        text: 'Каждый день начинается с потрясающего вида на море. Это именно то, что я хотел!',
        author: 'Александр К.'
      }
    },
    images: [
      { id: 1, type: 'image', alt: 'План ванной комнаты' },
      { id: 2, type: 'image', alt: '3D визуализация' },
      { id: 3, type: 'image', alt: 'Детали отделки' },
      { id: 4, type: 'image', alt: 'Готовая ванная комната' }
    ]
  },
  'bedroom-minimal-ekb': {
    title: 'Минималистичная спальня в Екатеринбурге',
    subtitle: 'Современная спальня в стиле минимализм',
    location: 'Екатеринбург',
    year: '2024',
    area: '16 м²',
    style: 'Минимализм',
    type: 'Спальня',
    problem: {
      title: 'Проблема',
      description: 'Молодая пара хотела создать уютную спальню в стиле минимализм с достаточным местом для хранения.',
      issues: [
        'Необходимость размещения гардеробной',
        'Создание уютной атмосферы',
        'Оптимизация пространства'
      ]
    },
    solution: {
      title: 'Решение',
      description: 'Разработали проект спальни с встроенной гардеробной и продуманной системой освещения.',
      features: [
        'Встроенная гардеробная система',
        'Многоуровневое освещение',
        'Минималистичная мебель'
      ]
    },
    result: {
      title: 'Результат',
      description: 'Создана уютная и функциональная спальня, где каждый элемент имеет свое место.',
      achievements: [
        'Увеличено место для хранения в 2 раза',
        'Создана уютная атмосфера для отдыха',
        'Оптимизировано использование пространства'
      ],
      testimonial: {
        text: 'Теперь у нас есть идеальное место для отдыха. Все продумано до мелочей!',
        author: 'Мария и Дмитрий'
      }
    },
    images: [
      { id: 1, type: 'image', alt: 'План спальни' },
      { id: 2, type: 'image', alt: '3D визуализация спальни' },
      { id: 3, type: 'image', alt: 'Гардеробная система' },
      { id: 4, type: 'image', alt: 'Готовая спальня' }
    ]
  },
  'kids-room-kazan': {
    title: 'Детская комната в Казани',
    subtitle: 'Многофункциональная детская для растущего ребенка',
    location: 'Казань',
    year: '2024',
    area: '14 м²',
    style: 'Современный',
    type: 'Детская комната',
    problem: {
      title: 'Проблема',
      description: 'Родители хотели создать детскую комнату, которая будет расти вместе с ребенком и вмещать все необходимое.',
      issues: [
        'Необходимость размещения игровой и учебной зоны',
        'Система хранения для игрушек и одежды',
        'Безопасность и экологичность материалов'
      ]
    },
    solution: {
      title: 'Решение',
      description: 'Создали проект трансформируемой детской комнаты с модульной мебелью и продуманной системой хранения.',
      features: [
        'Модульная мебель с возможностью трансформации',
        'Отдельные зоны для игр и учебы',
        'Система хранения с ящиками и корзинами'
      ]
    },
    result: {
      title: 'Результат',
      description: 'Детская комната стала любимым местом ребенка, где есть место для игр, учебы и отдыха.',
      achievements: [
        'Создано многофункциональное пространство',
        'Реализована система трансформируемой мебели',
        'Обеспечена безопасность и экологичность'
      ],
      testimonial: {
        text: 'Наш ребенок в восторге от своей новой комнаты! Здесь есть место для всего, что ему нужно.',
        author: 'Семья Ахметовых'
      }
    },
    images: [
      { id: 1, type: 'image', alt: 'План детской комнаты' },
      { id: 2, type: 'image', alt: '3D визуализация детской' },
      { id: 3, type: 'image', alt: 'Игровая зона' },
      { id: 4, type: 'image', alt: 'Готовая детская комната' }
    ]
  }
}

export default function CasePage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const caseItem = casesData[params.id as keyof typeof casesData]

  if (!caseItem) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-neutral-200 mb-4">Кейс не найден</h1>
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
    setSelectedImage((prev) => (prev === 0 ? caseItem.images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev === caseItem.images.length - 1 ? 0 : prev + 1))
  }

  const handleOrderProject = () => {
    setIsContactModalOpen(true)
  }

  const handleContact = () => {
    setIsContactModalOpen(true)
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

        {/* Заголовок кейса */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-neutral-200 mb-2">
            {caseItem.title}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 mb-4">
            {caseItem.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-3 py-1 bg-accent-500/20 border border-accent-500/30 rounded-full text-sm text-accent-400">
              {caseItem.area}
            </span>
            <span className="px-3 py-1 bg-neutral-800/50 border border-neutral-700 rounded-full text-sm text-neutral-300">
              {caseItem.style}
            </span>
            <span className="px-3 py-1 bg-neutral-800/50 border border-neutral-700 rounded-full text-sm text-neutral-300">
              {caseItem.location}, {caseItem.year}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Левая колонка - Проблема, Решение, Результат */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Проблема */}
            <div className="bg-background-surface/30 border border-neutral-800 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <h2 className="text-xl font-medium text-neutral-200">{caseItem.problem.title}</h2>
              </div>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                {caseItem.problem.description}
              </p>
              <div className="space-y-2">
                {caseItem.problem.issues.map((issue, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-neutral-400 leading-relaxed">
                      {issue}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Решение */}
            <div className="bg-background-surface/30 border border-neutral-800 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <h2 className="text-xl font-medium text-neutral-200">{caseItem.solution.title}</h2>
              </div>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                {caseItem.solution.description}
              </p>
              <div className="space-y-2">
                {caseItem.solution.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-neutral-400 leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Результат */}
            <div className="bg-background-surface/30 border border-neutral-800 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
                <h2 className="text-xl font-medium text-neutral-200">{caseItem.result.title}</h2>
              </div>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                {caseItem.result.description}
              </p>
              <div className="space-y-2 mb-6">
                {caseItem.result.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-neutral-400 leading-relaxed">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>

              {/* Отзыв клиента */}
              <div className="bg-accent-500/10 border border-accent-500/20 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Quote className="w-5 h-5 text-accent-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-neutral-300 leading-relaxed mb-2">
                      {caseItem.result.testimonial.text}
                    </p>
                    <p className="text-xs text-accent-400 font-medium">
                      {caseItem.result.testimonial.author}
                    </p>
                  </div>
                </div>
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

          {/* Правая колонка - Галерея */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
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
                        {caseItem.images[0].alt}
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
                    Фото 1 из {caseItem.images.length}
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
                {caseItem.images.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
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
                      {caseItem.images[selectedImage].alt}
                    </p>
                    <p className="text-sm sm:text-base text-white/80">
                      {selectedImage + 1} из {caseItem.images.length}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модальное окно контактов */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  )
}
