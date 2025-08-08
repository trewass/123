'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const exampleProjects = [
  {
    id: 'kitchen-modern',
    title: 'Проект кухни - Современный стиль',
    description: 'Полная схема коммуникаций для кухни с современным дизайном',
    thumbnail: '/images/Просмотр 2025-08-07 18.24.56.png',
    features: ['Схема электрики', 'Схема сантехники', '3D визуализация', 'Подбор материалов'],
    room: 'Кухня',
    area: 'Современный стиль',
    location: 'Москва',
    year: '2024',
    fullDescription: 'Проект современной кухни с точным планированием всех подключений и мебели. Особое внимание уделено эргономике рабочего пространства и удобству использования.',
    details: [
      'Розетки для техники на оптимальной высоте',
      'Вывод воды для посудомоечной машины',
      'Освещение рабочей зоны LED-лентой',
      'Вентиляция вытяжки через потолок',
      'Фартук из керамогранита 60 см',
      'Столешница из искусственного камня'
    ]
  },
  {
    id: 'living-classic',
    title: 'Гостиная - Классический интерьер',
    description: 'Детальный проект гостиной с классическим дизайном',
    thumbnail: '/images/Просмотр 2025-08-07 18.25.39.png',
    features: ['Строительные схемы', 'Монтажные работы', '3D дизайн', 'Спецификация'],
    room: 'Гостиная',
    area: 'Классический стиль',
    location: 'Санкт-Петербург',
    year: '2024',
    fullDescription: 'Классическая гостиная с элегантным дизайном и продуманной планировкой. Проект учитывает все нюансы классического стиля.',
    details: [
      'Декоративная лепнина на потолке',
      'Паркетный пол из дуба',
      'Классические люстры и бра',
      'Каминная зона с отделкой',
      'Встроенная система хранения',
      'Текстильное оформление окон'
    ]
  },
  {
    id: 'bedroom-minimal',
    title: 'Спальня - Минимализм',
    description: 'Современная спальня в стиле минимализм',
    thumbnail: '/images/Просмотр 2025-08-07 18.25.50.png',
    features: ['Базовая схема', 'Планировка', 'Материалы', 'Смета'],
    room: 'Спальня',
    area: 'Минимализм',
    location: 'Екатеринбург',
    year: '2024',
    fullDescription: 'Минималистичная спальня с акцентом на функциональность и спокойную атмосферу. Проект создан для максимального комфорта.',
    details: [
      'Встроенная система хранения',
      'Скрытое освещение',
      'Нейтральная цветовая палитра',
      'Функциональная зона отдыха',
      'Встроенная подсветка',
      'Минималистичная мебель'
    ]
  },
  {
    id: 'bathroom-lux',
    title: 'Ванная комната - Люкс',
    description: 'Роскошная ванная комната с премиальными материалами',
    thumbnail: '/images/Просмотр 2025-08-07 18.26.21.png',
    features: ['Технические схемы', 'Детализация', 'Спецификация', 'Монтаж'],
    room: 'Ванная',
    area: 'Люкс',
    location: 'Сочи',
    year: '2024',
    fullDescription: 'Премиальная ванная комната с использованием элитных материалов и современного оборудования. Проект создан для максимального комфорта.',
    details: [
      'Мраморная отделка стен',
      'Двухконтурная система отопления',
      'Встроенная система вентиляции',
      'Премиальная сантехника',
      'Подсветка зеркал',
      'Система "умный дом"'
    ]
  },
  {
    id: 'kids-play',
    title: 'Детская комната - Игровая зона',
    description: 'Функциональная детская с игровой зоной',
    thumbnail: '/images/Просмотр 2025-08-07 18.26.42.png',
    features: ['Безопасность', 'Функциональность', 'Игровая зона', 'Хранение'],
    room: 'Детская',
    area: 'Игровая зона',
    location: 'Казань',
    year: '2024',
    fullDescription: 'Детская комната с продуманной игровой зоной и безопасной мебелью. Проект учитывает все потребности ребенка.',
    details: [
      'Безопасная мебель без острых углов',
      'Игровая зона с мягким покрытием',
      'Встроенная система хранения игрушек',
      'Регулируемое освещение',
      'Экологичные материалы',
      'Трансформируемая мебель'
    ]
  },
  {
    id: 'office-professional',
    title: 'Рабочий кабинет - Профессиональный',
    description: 'Современный рабочий кабинет для продуктивности',
    thumbnail: '/images/Просмотр 2025-08-07 18.26.52.png',
    features: ['Эргономика', 'Освещение', 'Хранение', 'Технологии'],
    room: 'Кабинет',
    area: 'Профессиональный',
    location: 'Новосибирск',
    year: '2024',
    fullDescription: 'Профессиональный рабочий кабинет с эргономичной мебелью и современными технологиями. Проект создан для максимальной продуктивности.',
    details: [
      'Эргономичное рабочее место',
      'Система управления освещением',
      'Встроенная система хранения документов',
      'Технологическая зона',
      'Зона для встреч',
      'Система кондиционирования'
    ]
  },
]

export default function ExamplesSection() {
  return (
    <section id="examples" className="py-12 sm:py-16 lg:py-20 bg-background-secondary">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-200 mb-4 sm:mb-6">
            Примеры наших проектов
          </h2>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-3xl mx-auto">
            Реальные проекты с детальными планами и визуализацией. Каждый проект создан с учетом всех пожеланий клиента.
          </p>
        </motion.div>

        {/* Сетка проектов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {exampleProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/project/${project.id}`} className="block">
                <div className="bg-background-surface/30 border border-neutral-800 rounded-2xl p-4 sm:p-6 backdrop-blur-sm hover:bg-background-surface/50 transition-all duration-300 hover:scale-105 group-hover:border-accent-500/30">
                  {/* Изображение проекта */}
                  <div className="relative aspect-video mb-4 sm:mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-accent-500/20 to-accent-600/20">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-orange-500/30 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 border border-white/30 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-white text-2xl sm:text-3xl">🏠</span>
                        </div>
                        <p className="text-sm text-white/80">Превью проекта</p>
                      </div>
                    </div>
                    
                    {/* Иконка внешней ссылки */}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Информация о проекте */}
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium text-neutral-200 mb-2 group-hover:text-accent-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Метаданные проекта */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-accent-500/20 border border-accent-500/30 rounded-full text-xs text-accent-400">
                        {project.room}
                      </span>
                      <span className="px-3 py-1 bg-neutral-800/50 border border-neutral-700 rounded-full text-xs text-neutral-300">
                        {project.area}
                      </span>
                    </div>

                    {/* Особенности проекта */}
                    <div className="space-y-2">
                      <p className="text-xs text-neutral-500 uppercase tracking-wide">
                        Особенности проекта:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-background-surface/50 border border-neutral-700 rounded text-xs text-neutral-400"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Кнопка просмотра */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-neutral-500">
                        {project.location}, {project.year}
                      </span>
                      <div className="flex items-center space-x-1 text-accent-400 group-hover:text-accent-300 transition-colors">
                        <span className="text-sm font-medium">Подробнее</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA секция */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="bg-background-surface/30 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="text-xl sm:text-2xl font-medium text-neutral-200 mb-4">
              Нужен похожий проект?
            </h3>
            <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
              Создадим индивидуальный проект с учетом всех ваших пожеланий и особенностей помещения.
            </p>
            <button 
              onClick={() => {
                const contactModal = document.getElementById('contact-modal')
                if (contactModal) {
                  contactModal.style.display = 'flex'
                }
              }}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Заказать проект</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 