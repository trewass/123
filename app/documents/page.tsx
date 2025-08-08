'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Download, Eye, FileText, Star, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface DocumentFile {
  id: string
  name: string
  description: string
  category: string
  size: string
  pages: number
  lastUpdated: string
  downloads: number
  rating: number
  icon: string
  features: string[]
  requirements: string[]
}

export default function DocumentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDocument, setSelectedDocument] = useState<DocumentFile | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const documents: DocumentFile[] = [
    {
      id: 'tech-conditions-2024',
      name: 'Технические условия 2024',
      description: 'Актуальные технические условия для всех типов проектов мебели и интерьера',
      category: 'technical',
      size: '2.4 MB',
      pages: 45,
      lastUpdated: '15.01.2024',
      downloads: 1247,
      rating: 4.8,
      icon: '📋',
      features: [
        'Современные стандарты качества',
        'Требования к материалам',
        'Технические характеристики',
        'Нормы безопасности'
      ],
      requirements: [
        'Adobe Reader или аналогичная программа',
        'Интернет-соединение для загрузки'
      ]
    },
    {
      id: 'quality-standards-premium',
      name: 'Стандарты качества Премиум',
      description: 'Высокие стандарты качества для премиальной мебели и интерьеров',
      category: 'quality',
      size: '3.1 MB',
      pages: 67,
      lastUpdated: '20.01.2024',
      downloads: 892,
      rating: 4.9,
      icon: '⭐',
      features: [
        'Премиальные материалы',
        'Высокие стандарты отделки',
        'Гарантийные обязательства',
        'Контроль качества'
      ],
      requirements: [
        'Adobe Reader или аналогичная программа',
        'Интернет-соединение для загрузки'
      ]
    },
    {
      id: 'installation-guide-complete',
      name: 'Полное руководство по монтажу',
      description: 'Пошаговые инструкции по установке и монтажу всех типов мебели',
      category: 'installation',
      size: '4.2 MB',
      pages: 89,
      lastUpdated: '25.01.2024',
      downloads: 1563,
      rating: 4.7,
      icon: '🔧',
      features: [
        'Пошаговые инструкции',
        'Фото и схемы',
        'Список инструментов',
        'Меры безопасности'
      ],
      requirements: [
        'Adobe Reader или аналогичная программа',
        'Интернет-соединение для загрузки'
      ]
    },
    {
      id: 'safety-regulations',
      name: 'Правила безопасности',
      description: 'Основные правила безопасности при работе с мебелью и материалами',
      category: 'safety',
      size: '1.8 MB',
      pages: 32,
      lastUpdated: '10.01.2024',
      downloads: 2341,
      rating: 4.6,
      icon: '🛡️',
      features: [
        'Правила безопасности',
        'Средства защиты',
        'Экстренные ситуации',
        'Первая помощь'
      ],
      requirements: [
        'Adobe Reader или аналогичная программа',
        'Интернет-соединение для загрузки'
      ]
    },
    {
      id: 'material-guide-2024',
      name: 'Справочник материалов 2024',
      description: 'Полный каталог материалов с характеристиками и рекомендациями',
      category: 'materials',
      size: '5.6 MB',
      pages: 156,
      lastUpdated: '30.01.2024',
      downloads: 987,
      rating: 4.8,
      icon: '📚',
      features: [
        'Каталог материалов',
        'Технические характеристики',
        'Рекомендации по выбору',
        'Сравнительные таблицы'
      ],
      requirements: [
        'Adobe Reader или аналогичная программа',
        'Интернет-соединение для загрузки'
      ]
    },
    {
      id: 'warranty-terms',
      name: 'Условия гарантии',
      description: 'Подробные условия гарантийного обслуживания и ремонта',
      category: 'warranty',
      size: '1.5 MB',
      pages: 28,
      lastUpdated: '05.01.2024',
      downloads: 1123,
      rating: 4.5,
      icon: '📄',
      features: [
        'Гарантийные обязательства',
        'Условия ремонта',
        'Сроки обслуживания',
        'Контакты поддержки'
      ],
      requirements: [
        'Adobe Reader или аналогичная программа',
        'Интернет-соединение для загрузки'
      ]
    }
  ]

  const categories = [
    { id: 'all', name: 'Все документы', icon: '📁' },
    { id: 'technical', name: 'Технические', icon: '📋' },
    { id: 'quality', name: 'Качество', icon: '⭐' },
    { id: 'installation', name: 'Монтаж', icon: '🔧' },
    { id: 'safety', name: 'Безопасность', icon: '🛡️' },
    { id: 'materials', name: 'Материалы', icon: '📚' },
    { id: 'warranty', name: 'Гарантия', icon: '📄' }
  ]

  const filteredDocuments = selectedCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory)

  const handleDocumentClick = (doc: DocumentFile) => {
    setSelectedDocument(doc)
    setIsModalOpen(true)
  }

  const handleDownload = (doc: DocumentFile) => {
    // Здесь будет логика скачивания
    console.log(`Скачивание документа: ${doc.name}`)
  }

  const handlePreview = (doc: DocumentFile) => {
    // Здесь будет логика предварительного просмотра
    console.log(`Просмотр документа: ${doc.name}`)
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

        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4">
            <span className="gradient-text">Техническая документация</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-3xl mx-auto">
            Полный комплект технической документации для вашего проекта. 
            Скачивайте актуальные документы и руководства.
          </p>
        </motion.div>

        {/* Фильтры по категориям */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/25'
                    : 'bg-background-surface/30 text-neutral-300 hover:bg-background-surface/50 border border-neutral-800'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Сетка документов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-background-surface/30 border border-neutral-800 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group hover:border-accent-500/50 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-500/10 rounded-full blur-2xl group-hover:bg-accent-500/20 transition-all duration-300" />
              <div className="relative z-10">
                {/* Заголовок документа */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-accent-500/20 border border-accent-500/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{doc.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-neutral-200 mb-1 group-hover:text-accent-400 transition-colors">
                      {doc.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-neutral-400">
                      <span>{doc.size}</span>
                      <span>{doc.pages} стр.</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{doc.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Описание */}
                <p className="text-sm text-neutral-300 mb-4 leading-relaxed">
                  {doc.description}
                </p>

                {/* Метаданные */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>Обновлено: {doc.lastUpdated}</span>
                    <span>{doc.downloads} скачиваний</span>
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleDocumentClick(doc)}
                    className="text-sm text-accent-400 hover:text-accent-300 transition-colors font-medium"
                  >
                    Подробнее
                  </button>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handlePreview(doc)}
                      className="p-2 text-neutral-400 hover:text-accent-400 transition-colors bg-neutral-800/50 rounded-lg hover:bg-neutral-800"
                      title="Предварительный просмотр"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDownload(doc)}
                      className="p-2 text-neutral-400 hover:text-accent-400 transition-colors bg-neutral-800/50 rounded-lg hover:bg-neutral-800"
                      title="Скачать документ"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Информационный блок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-background-surface/30 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm"
        >
          <div className="text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-medium text-neutral-200">
              Техническая поддержка
            </h3>
            <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto">
              Все документы соответствуют действующим стандартам и нормам. 
              При возникновении вопросов обращайтесь к нашим специалистам.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button className="btn-secondary text-sm sm:text-base">
                Получить консультацию
              </button>
              <button className="btn-primary text-sm sm:text-base">
                Заказать звонок
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Модальное окно с подробной информацией о документе */}
      <AnimatePresence>
        {isModalOpen && selectedDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-2xl w-full max-h-[90vh] bg-background-surface/90 border border-neutral-800 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Кнопка закрытия */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <span className="text-white text-lg">×</span>
              </button>

              {/* Содержимое модального окна */}
              <div className="p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-accent-500/20 border border-accent-500/30 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">{selectedDocument.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-medium text-neutral-200 mb-2">
                      {selectedDocument.name}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-neutral-400">
                      <span>{selectedDocument.size}</span>
                      <span>{selectedDocument.pages} страниц</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{selectedDocument.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-neutral-300 mb-6 leading-relaxed">
                  {selectedDocument.description}
                </p>

                {/* Основные возможности */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-neutral-200 mb-3 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Основные возможности</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedDocument.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-neutral-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Системные требования */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-neutral-200 mb-3 flex items-center space-x-2">
                    <Info className="w-5 h-5 text-blue-400" />
                    <span>Системные требования</span>
                  </h3>
                  <div className="space-y-2">
                    {selectedDocument.requirements.map((req, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-neutral-300">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button 
                    onClick={() => handleDownload(selectedDocument)}
                    className="btn-primary flex-1 flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Скачать документ</span>
                  </button>
                  <button 
                    onClick={() => handlePreview(selectedDocument)}
                    className="btn-secondary flex-1 flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Предварительный просмотр</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
