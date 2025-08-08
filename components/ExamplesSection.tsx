'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

const exampleProjects = [
  {
    id: 'kitchen-moscow',
    title: 'Кухня в Москве',
    subtitle: 'Современная кухня с продуманной эргономикой',
    area: '12 м²',
    location: 'Москва',
    year: '2024',
    description: 'Проект современной кухни с точным планированием всех подключений и мебели.',
    images: [
      { id: 1, alt: 'План розеток' },
      { id: 2, alt: '3D визуализация кухни' },
      { id: 3, alt: 'Детали мебели' },
      { id: 4, alt: 'Готовая кухня' }
    ]
  },
  {
    id: 'bathroom-sochi',
    title: 'Ванная в Сочи',
    subtitle: 'Премиальная ванная комната',
    area: '8 м²',
    location: 'Сочи',
    year: '2024',
    description: 'Роскошная ванная комната с панорамным видом на море.',
    images: [
      { id: 1, alt: 'План ванной комнаты' },
      { id: 2, alt: '3D визуализация' },
      { id: 3, alt: 'Детали отделки' },
      { id: 4, alt: 'Готовая ванная комната' }
    ]
  },
  {
    id: 'bedroom-ekb',
    title: 'Спальня в Екатеринбурге',
    subtitle: 'Минималистичная спальня',
    area: '16 м²',
    location: 'Екатеринбург',
    year: '2024',
    description: 'Современная спальня в стиле минимализм с встроенной гардеробной.',
    images: [
      { id: 1, alt: 'План спальни' },
      { id: 2, alt: '3D визуализация спальни' },
      { id: 3, alt: 'Гардеробная система' },
      { id: 4, alt: 'Готовая спальня' }
    ]
  },
  {
    id: 'kids-room-kazan',
    title: 'Детская в Казани',
    subtitle: 'Многофункциональная детская',
    area: '14 м²',
    location: 'Казань',
    year: '2024',
    description: 'Детская комната для растущего ребенка с трансформируемой мебелью.',
    images: [
      { id: 1, alt: 'План детской комнаты' },
      { id: 2, alt: '3D визуализация детской' },
      { id: 3, alt: 'Игровая зона' },
      { id: 4, alt: 'Готовая детская комната' }
    ]
  },
  {
    id: 'living-room-spb',
    title: 'Гостиная в СПб',
    subtitle: 'Современная гостиная',
    area: '20 м²',
    location: 'Санкт-Петербург',
    year: '2024',
    description: 'Просторная гостиная с зонированием и многофункциональной мебелью.',
    images: [
      { id: 1, alt: 'План гостиной' },
      { id: 2, alt: '3D визуализация гостиной' },
      { id: 3, alt: 'Зона отдыха' },
      { id: 4, alt: 'Готовая гостиная' }
    ]
  },
  {
    id: 'office-novosibirsk',
    title: 'Офис в Новосибирске',
    subtitle: 'Современный офис',
    area: '45 м²',
    location: 'Новосибирск',
    year: '2024',
    description: 'Функциональный офис с продуманной системой хранения и рабочими зонами.',
    images: [
      { id: 1, alt: 'План офиса' },
      { id: 2, alt: '3D визуализация офиса' },
      { id: 3, alt: 'Рабочие зоны' },
      { id: 4, alt: 'Готовый офис' }
    ]
  }
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
            Примеры <span className="gradient-text">техпроектов</span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-3xl mx-auto">
            Изучите наши проекты и посмотрите, как мы создаем функциональные пространства
          </p>
        </motion.div>

        {/* Сетка проектов 3x3 */}
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
                          <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                        <p className="text-sm text-white/80">Фото проект</p>
                      </div>
                    </div>
                    
                    {/* Иконка внешней ссылки */}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Информация о проекте */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium text-neutral-200 mb-1 group-hover:text-accent-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base text-neutral-400 mb-3">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Метаданные проекта */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-accent-500/20 border border-accent-500/30 rounded-full text-xs text-accent-400">
                        {project.area}
                      </span>
                      <span className="px-3 py-1 bg-neutral-800/50 border border-neutral-700 rounded-full text-xs text-neutral-300">
                        {project.location}
                      </span>
                      <span className="px-3 py-1 bg-neutral-800/50 border border-neutral-700 rounded-full text-xs text-neutral-300">
                        {project.year}
                      </span>
                    </div>

                    {/* Краткое описание */}
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Информация о фото */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-neutral-500">
                        {project.images.length} фото проекта
                      </span>
                      <div className="flex items-center space-x-1 text-accent-400 group-hover:text-accent-300 transition-colors">
                        <span className="text-sm font-medium">Смотреть проект</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Кнопка "Посмотреть все проекты" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link 
            href="/projects"
            className="btn-primary inline-flex items-center space-x-2 text-sm sm:text-base px-8 py-4"
          >
            <span>Посмотреть все проекты</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 