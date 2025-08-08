'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Eye, FileText, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const exampleProjects = [
  {
    id: 1,
    title: 'Проект кухни - Современный стиль',
    description: 'Полная схема коммуникаций для кухни с современным дизайном',
    pdfPath: '/api/pdf/Большой проект. Пример.pdf',
    thumbnail: '/images/Просмотр 2025-08-07 18.24.56.png',
    features: ['Схема электрики', 'Схема сантехники', '3D визуализация', 'Подбор материалов'],
    room: 'Кухня',
    area: 'Современный стиль',
  },
  {
    id: 2,
    title: 'Гостиная - Классический интерьер',
    description: 'Детальный проект гостиной с классическим дизайном',
    pdfPath: '/api/pdf/Строительно_монтажные_большй_проект_Пример.pdf',
    thumbnail: '/images/Просмотр 2025-08-07 18.25.39.png',
    features: ['Строительные схемы', 'Монтажные работы', '3D дизайн', 'Спецификация'],
    room: 'Гостиная',
    area: 'Классический стиль',
  },
  {
    id: 3,
    title: 'Спальня - Минимализм',
    description: 'Современная спальня в стиле минимализм',
    pdfPath: '/api/pdf/Проект. пример.pdf',
    thumbnail: '/images/Просмотр 2025-08-07 18.25.50.png',
    features: ['Базовая схема', 'Планировка', 'Материалы', 'Смета'],
    room: 'Спальня',
    area: 'Минимализм',
  },
  {
    id: 4,
    title: 'Ванная комната - Люкс',
    description: 'Роскошная ванная комната с премиальными материалами',
    pdfPath: '/api/pdf/Схемы. Пример.pdf',
    thumbnail: '/images/Просмотр 2025-08-07 18.26.21.png',
    features: ['Технические схемы', 'Детализация', 'Спецификация', 'Монтаж'],
    room: 'Ванная',
    area: 'Люкс',
  },
  {
    id: 5,
    title: 'Детская комната - Игровая зона',
    description: 'Функциональная детская с игровой зоной',
    pdfPath: '/api/pdf/Денис Айкаван роспись.pdf',
    thumbnail: '/images/Просмотр 2025-08-07 18.26.42.png',
    features: ['Безопасность', 'Функциональность', 'Игровая зона', 'Хранение'],
    room: 'Детская',
    area: 'Игровая зона',
  },
  {
    id: 6,
    title: 'Рабочий кабинет - Профессиональный',
    description: 'Современный рабочий кабинет для продуктивности',
    pdfPath: '/api/pdf/КП Рудем.pdf',
    thumbnail: '/images/Просмотр 2025-08-07 18.26.52.png',
    features: ['Эргономика', 'Освещение', 'Хранение', 'Технологии'],
    room: 'Кабинет',
    area: 'Профессиональный',
  },
]

export default function ExamplesSection() {
  const [selectedProject, setSelectedProject] = useState<typeof exampleProjects[0] | null>(null)
  const [showPdfModal, setShowPdfModal] = useState(false)
  const [pdfUrl, setPdfUrl] = useState('')

  const handleProjectClick = (project: typeof exampleProjects[0]) => {
    setSelectedProject(project)
  }

  const handleDownload = (pdfPath: string, title: string) => {
    const link = document.createElement('a')
    link.href = pdfPath
    link.download = title
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleView = (pdfPath: string) => {
    setPdfUrl(pdfPath)
    setShowPdfModal(true)
  }

  const closePdfModal = () => {
    setShowPdfModal(false)
    setPdfUrl('')
  }

  return (
    <section id="examples" className="py-12 sm:py-16 lg:py-20 bg-background-secondary">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6">
            Примеры <span className="gradient-text">техпроектов</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto px-4">
            Изучите реальные проекты с полной технической документацией и схемами коммуникаций
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {exampleProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-background-surface border border-neutral-800 rounded-xl overflow-hidden hover:border-accent-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/10"
            >
              {/* Превью проекта */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-neutral-600/20 to-neutral-700/20 flex items-center justify-center">
                    <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-neutral-400" />
                  </div>
                )}

                {/* Overlay с кнопками */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2 sm:space-x-3">
                  <button
                    onClick={() => handleView(project.pdfPath)}
                    className="bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-lg hover:bg-white/30 transition-colors"
                    title="Просмотреть"
                  >
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => handleDownload(project.pdfPath, project.title)}
                    className="bg-accent-500 text-white p-2 sm:p-3 rounded-lg hover:bg-accent-600 transition-colors"
                    title="Скачать"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Бейдж типа проекта */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                  <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-full">
                    {project.room}
                  </span>
                </div>
              </div>

              {/* Информация о проекте */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-medium text-white mb-2 group-hover:text-accent-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm mb-3 sm:mb-4">
                  {project.description}
                </p>

                {/* Особенности проекта */}
                <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                  {project.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className="text-accent-500 text-xs">✓</span>
                      <span className="text-neutral-400 text-xs">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Кнопка подробнее */}
                <button
                  onClick={() => handleProjectClick(project)}
                  className="flex items-center space-x-2 text-accent-400 hover:text-accent-300 transition-colors text-xs sm:text-sm font-medium"
                >
                  <span>Подробнее</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Модальное окно с подробной информацией */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-background-surface border border-neutral-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-4 sm:p-6 border-b border-neutral-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl sm:text-2xl font-medium text-white">
                    {selectedProject.title}
                  </h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  {/* Превью */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    {selectedProject.thumbnail ? (
                      <Image
                        src={selectedProject.thumbnail}
                        alt={selectedProject.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-neutral-600/20 to-neutral-700/20 flex items-center justify-center">
                        <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-neutral-400" />
                      </div>
                    )}
                  </div>

                  {/* Информация */}
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="text-base sm:text-lg font-medium text-white mb-2">Описание</h4>
                      <p className="text-neutral-300 text-xs sm:text-sm">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base sm:text-lg font-medium text-white mb-2">Особенности</h4>
                      <div className="grid grid-cols-1 gap-1 sm:gap-2">
                        {selectedProject.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <span className="text-accent-500 text-xs sm:text-sm">✓</span>
                            <span className="text-neutral-300 text-xs sm:text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="bg-neutral-800 text-neutral-300 px-2 sm:px-3 py-1 rounded-full text-xs">
                        {selectedProject.room}
                      </span>
                      <span className="bg-neutral-800 text-neutral-300 px-2 sm:px-3 py-1 rounded-full text-xs">
                        {selectedProject.area}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={() => handleView(selectedProject.pdfPath)}
                    className="flex items-center justify-center space-x-2 bg-accent-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-accent-600 transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Просмотреть PDF</span>
                  </button>
                  <button
                    onClick={() => handleDownload(selectedProject.pdfPath, selectedProject.title)}
                    className="flex items-center justify-center space-x-2 bg-background-primary border border-neutral-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:border-accent-500 transition-colors text-sm"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Скачать</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Модальное окно для просмотра PDF */}
        {showPdfModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-background-surface border border-neutral-800 rounded-xl w-full max-w-6xl h-[90vh] relative"
            >
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-800">
                <h3 className="text-lg sm:text-xl font-medium text-white">
                  Просмотр PDF документа
                </h3>
                <button
                  onClick={closePdfModal}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 sm:p-6 h-full overflow-auto">
                <iframe
                  src={pdfUrl}
                  className="w-full h-full rounded-lg"
                  title="PDF Viewer"
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
} 