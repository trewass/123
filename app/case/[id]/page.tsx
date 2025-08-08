'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Download, ExternalLink, Play, X, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle, Star, Quote } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// Данные кейсов
const casesData = {
  'kitchen-moscow-family': {
    title: 'Кухня для семьи из 4 человек',
    subtitle: 'Москва, ЖК "Парк Легенд"',
    location: 'Москва',
    year: '2024',
    area: '12 м²',
    style: 'Современный',
    type: 'Жилой проект',
    problem: {
      title: 'Проблема клиента',
      description: 'Семья из 4 человек жила в квартире с кухней 12 м². Основные проблемы: не хватало места для хранения, техника не помещалась, розеток было мало, а вытяжка не работала эффективно.',
      issues: [
        'Не хватало места для хранения продуктов и посуды',
        'Посудомоечная машина не помещалась',
        'Всего 3 розетки на всю кухню',
        'Вытяжка не справлялась с запахами',
        'Не было места для кофемашины'
      ]
    },
    solution: {
      title: 'Наше решение',
      description: 'Создали детальный план с учетом всех потребностей семьи. Продумали каждую розетку, вытяжку и место для техники.',
      features: [
        'Схема электрики с 8 розетками в нужных местах',
        'План вентиляции с выводом через потолок',
        'Схема сантехники для ПММ и фильтра',
        '3D визуализация с точными размерами',
        'План освещения с LED-лентой'
      ]
    },
    result: {
      title: 'Результат',
      description: 'Кухня получилась функциональной и красивой. Все техника поместилась, места для хранения хватает, а готовить стало удобно.',
      achievements: [
        'Вместилось 4 шкафа для хранения',
        'ПММ поместилась идеально',
        'Кофемашина нашла свое место',
        'Вытяжка работает бесшумно',
        'Клиент доволен на 100%'
      ],
      testimonial: {
        text: '"Теперь готовить одно удовольствие! Все под рукой, техника работает отлично, а кухня выглядит современно и стильно."',
        author: 'Анна и Дмитрий, семья из 4 человек'
      }
    },
    images: [
      { id: 1, type: 'image', alt: 'План розеток' },
      { id: 2, type: 'image', alt: '3D визуализация' },
      { id: 3, type: 'image', alt: 'Результат до/после' },
      { id: 4, type: 'video', alt: 'Обзор готовой кухни' },
      { id: 5, type: 'image', alt: 'Детали мебели' },
      { id: 6, type: 'image', alt: 'Система хранения' }
    ]
  },
  'bathroom-luxury-sochi': {
    title: 'Ванная комната премиум класса',
    subtitle: 'Сочи, частный дом',
    location: 'Сочи',
    year: '2024',
    area: '8 м²',
    style: 'Люкс',
    type: 'Жилой проект',
    problem: {
      title: 'Проблема клиента',
      description: 'Владелец частного дома в Сочи хотел создать роскошную ванную комнату, но не знал, как правильно спланировать сантехнику и освещение.',
      issues: [
        'Не было плана размещения сантехники',
        'Освещение не подходило для макияжа',
        'Не было места для хранения косметики',
        'Душевая кабина не помещалась',
        'Не было системы вентиляции'
      ]
    },
    solution: {
      title: 'Наше решение',
      description: 'Разработали премиальный проект с использованием элитных материалов и современного оборудования.',
      features: [
        'План сантехники с точными размерами',
        'Схема освещения с подсветкой зеркал',
        'План вентиляции и отопления',
        '3D визуализация с материалами',
        'Спецификация премиальной сантехники'
      ]
    },
    result: {
      title: 'Результат',
      description: 'Получилась роскошная ванная комната, которая превзошла все ожидания клиента.',
      achievements: [
        'Вместилась душевая кабина 1.2х1.2м',
        'Установили двойную раковину',
        'Создали систему хранения косметики',
        'Освещение идеально для макияжа',
        'Клиент в восторге от результата'
      ],
      testimonial: {
        text: '"Ванная получилась просто потрясающая! Каждый день получаю удовольствие от использования. Все продумано до мелочей."',
        author: 'Елена, владелица частного дома'
      }
    },
    images: [
      { id: 1, type: 'image', alt: 'План сантехники' },
      { id: 2, type: 'image', alt: '3D визуализация' },
      { id: 3, type: 'image', alt: 'Результат до/после' },
      { id: 4, type: 'video', alt: 'Обзор ванной' },
      { id: 5, type: 'image', alt: 'Детали отделки' },
      { id: 6, type: 'image', alt: 'Система хранения' }
    ]
  },
  'bedroom-minimal-ekb': {
    title: 'Спальня в стиле минимализм',
    subtitle: 'Екатеринбург, новостройка',
    location: 'Екатеринбург',
    year: '2024',
    area: '16 м²',
    style: 'Минимализм',
    type: 'Жилой проект',
    problem: {
      title: 'Проблема клиента',
      description: 'Молодая пара хотела создать уютную спальню в стиле минимализм, но не знала, как правильно организовать пространство.',
      issues: [
        'Не было места для гардеробной',
        'Освещение не создавало уюта',
        'Не было места для телевизора',
        'Не знали, где разместить кровать',
        'Не было системы хранения'
      ]
    },
    solution: {
      title: 'Наше решение',
      description: 'Создали функциональный план с акцентом на спокойную атмосферу и удобство использования.',
      features: [
        'План размещения мебели',
        'Схема скрытого освещения',
        'План гардеробной системы',
        '3D визуализация интерьера',
        'Спецификация мебели'
      ]
    },
    result: {
      title: 'Результат',
      description: 'Получилась уютная и функциональная спальня, где приятно отдыхать и хранить вещи.',
      achievements: [
        'Вместилась гардеробная 2.5м',
        'Создали уютное освещение',
        'Нашли место для телевизора',
        'Система хранения решает все задачи',
        'Клиенты довольны атмосферой'
      ],
      testimonial: {
        text: '"Спальня получилась именно такой, как мы хотели - уютной и функциональной. Теперь здесь приятно проводить время."',
        author: 'Александр и Мария, молодая пара'
      }
    },
    images: [
      { id: 1, type: 'image', alt: 'План размещения' },
      { id: 2, type: 'image', alt: '3D визуализация' },
      { id: 3, type: 'image', alt: 'Результат до/после' },
      { id: 4, type: 'video', alt: 'Обзор спальни' },
      { id: 5, type: 'image', alt: 'Гардеробная' },
      { id: 6, type: 'image', alt: 'Освещение' }
    ]
  },
  'kids-room-kazan': {
    title: 'Детская комната с игровой зоной',
    subtitle: 'Казань, 3-комнатная квартира',
    location: 'Казань',
    year: '2024',
    area: '14 м²',
    style: 'Детский',
    type: 'Жилой проект',
    problem: {
      title: 'Проблема клиента',
      description: 'Родители хотели создать безопасную и функциональную детскую для 6-летнего ребенка, но не знали, как совместить игровую зону и спальное место.',
      issues: [
        'Не было места для игровой зоны',
        'Мебель не была безопасной',
        'Не было системы хранения игрушек',
        'Освещение не подходило для ребенка',
        'Не было места для творчества'
      ]
    },
    solution: {
      title: 'Наше решение',
      description: 'Разработали безопасный и функциональный проект с учетом всех потребностей ребенка.',
      features: [
        'План безопасной мебели',
        'Схема игровой зоны',
        'План системы хранения',
        '3D визуализация интерьера',
        'Спецификация экологичных материалов'
      ]
    },
    result: {
      title: 'Результат',
      description: 'Получилась идеальная детская комната, где ребенок может играть, учиться и отдыхать.',
      achievements: [
        'Создали безопасную игровую зону',
        'Вместилась система хранения игрушек',
        'Нашли место для творчества',
        'Освещение подходит для ребенка',
        'Родители и ребенок довольны'
      ],
      testimonial: {
        text: '"Дочка в восторге от своей комнаты! Теперь у неё есть место и для игр, и для учебы. Все безопасно и красиво."',
        author: 'Ольга, мама 6-летней дочки'
      }
    },
    images: [
      { id: 1, type: 'image', alt: 'План размещения' },
      { id: 2, type: 'image', alt: '3D визуализация' },
      { id: 3, type: 'image', alt: 'Результат до/после' },
      { id: 4, type: 'video', alt: 'Обзор детской' },
      { id: 5, type: 'image', alt: 'Игровая зона' },
      { id: 6, type: 'image', alt: 'Система хранения' }
    ]
  },
  'office-novosibirsk': {
    title: 'Рабочий кабинет для предпринимателя',
    subtitle: 'Новосибирск, частный дом',
    location: 'Новосибирск',
    year: '2024',
    area: '20 м²',
    style: 'Профессиональный',
    type: 'Жилой проект',
    problem: {
      title: 'Проблема клиента',
      description: 'Предприниматель хотел создать профессиональный рабочий кабинет для продуктивной работы, но не знал, как правильно организовать пространство.',
      issues: [
        'Не было эргономичного рабочего места',
        'Освещение не подходило для работы',
        'Не было места для встреч',
        'Не было системы хранения документов',
        'Не было технологической зоны'
      ]
    },
    solution: {
      title: 'Наше решение',
      description: 'Разработали профессиональный проект с акцентом на продуктивность и комфорт.',
      features: [
        'План эргономичного рабочего места',
        'Схема профессионального освещения',
        'План зоны для встреч',
        '3D визуализация интерьера',
        'Спецификация офисной мебели'
      ]
    },
    result: {
      title: 'Результат',
      description: 'Получился профессиональный кабинет, где приятно и продуктивно работать.',
      achievements: [
        'Создали эргономичное рабочее место',
        'Вместилась зона для встреч',
        'Система хранения решает все задачи',
        'Освещение идеально для работы',
        'Клиент доволен продуктивностью'
      ],
      testimonial: {
        text: '"Кабинет получился именно таким, как я хотел - функциональным и стильным. Теперь работаю с удовольствием!"',
        author: 'Дмитрий, предприниматель'
      }
    },
    images: [
      { id: 1, type: 'image', alt: 'План размещения' },
      { id: 2, type: 'image', alt: '3D визуализация' },
      { id: 3, type: 'image', alt: 'Результат до/после' },
      { id: 4, type: 'video', alt: 'Обзор кабинета' },
      { id: 5, type: 'image', alt: 'Рабочая зона' },
      { id: 6, type: 'image', alt: 'Зона встреч' }
    ]
  }
}

export default function CasePage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    const contactModal = document.getElementById('contact-modal')
    if (contactModal) {
      contactModal.style.display = 'flex'
    }
  }

  const handleContact = () => {
    const contactModal = document.getElementById('contact-modal')
    if (contactModal) {
      contactModal.style.display = 'flex'
    }
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
    </div>
  )
}
