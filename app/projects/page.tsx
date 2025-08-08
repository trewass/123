'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ProjectsGallery from '@/components/ProjectsGallery'

const projects = [
  {
    id: 'demo',
    title: 'Кухня в современном стиле',
    location: 'Москва',
    year: '2024',
    type: 'Жилой проект',
    description: 'Проект современной кухни с точным планированием всех подключений и мебели. План учитывает расположение техники, освещения и сантехники для максимального удобства использования.',
    thumbnail: '/images/kitchen-preview.jpg',
    imageCount: 14,
    videoCount: 1
  },
  {
    id: 'timur-bakhchisaray',
    title: 'Тимур Бахчисарай',
    location: 'Бахчисарай',
    year: '2024',
    type: 'Жилой проект',
    description: 'Проект кухни в стиле минимализм с акцентом на функциональность и эргономику. Особое внимание уделено организации рабочего пространства.',
    thumbnail: '/images/timur-preview.jpg',
    imageCount: 8,
    videoCount: 1
  },
  {
    id: 'modern-kitchen',
    title: 'Современная кухня-столовая',
    location: 'Санкт-Петербург',
    year: '2024',
    type: 'Жилой проект',
    description: 'Интеграция кухни и столовой в единое пространство с продуманной системой освещения и эргономичным расположением мебели.',
    thumbnail: '/images/modern-kitchen-preview.jpg',
    imageCount: 12,
    videoCount: 0
  },
  {
    id: 'classic-interior',
    title: 'Классический интерьер',
    location: 'Казань',
    year: '2023',
    type: 'Жилой проект',
    description: 'Классический стиль с современными технологиями. Традиционные материалы в сочетании с инновационными решениями.',
    thumbnail: '/images/classic-preview.jpg',
    imageCount: 10,
    videoCount: 1
  },
  {
    id: 'minimalist-design',
    title: 'Минималистичный дизайн',
    location: 'Екатеринбург',
    year: '2023',
    type: 'Жилой проект',
    description: 'Минимализм в чистом виде с акцентом на функциональность и простоту форм. Максимальное использование пространства.',
    thumbnail: '/images/minimalist-preview.jpg',
    imageCount: 9,
    videoCount: 0
  },
  {
    id: 'luxury-kitchen',
    title: 'Люксовая кухня',
    location: 'Сочи',
    year: '2023',
    type: 'Жилой проект',
    description: 'Премиум-дизайн с использованием дорогих материалов и эксклюзивной техники. Внимание к каждой детали.',
    thumbnail: '/images/luxury-preview.jpg',
    imageCount: 15,
    videoCount: 2
  }
]

export default function ProjectsPage() {
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
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-4 sm:mb-6">
            Наши <span className="gradient-text">проекты</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto">
            Примеры выполненных работ с детальными планами и рендерами
          </p>
        </motion.div>

        {/* Галерея проектов */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ProjectsGallery projects={projects} />
        </motion.div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 sm:mt-20"
        >
          <div className="bg-background-surface/30 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-medium text-neutral-200">
                Хотите заказать похожий проект?
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto">
                Мы разработаем индивидуальный план для вашего пространства с учетом всех ваших пожеланий и особенностей помещения.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Link href="/" className="btn-primary text-sm sm:text-base px-6 py-3">
                  Заказать проект
                </Link>
                <Link href="/" className="btn-secondary text-sm sm:text-base px-6 py-3">
                  Связаться с нами
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
