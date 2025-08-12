'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import ContactModal from '@/components/ContactModal'

const allProjects = [
  {
    id: 'house-urozhaynoe',
    title: 'Частный дом в Урожайном',
    subtitle: 'Проект частного дома',
    area: '150 м²',
    location: 'с. Урожайное',
    year: '2025',
    description: 'Проект частного дома с точным планированием всех подключений и мебели. Указаны расположение выключателей и розеток, полностью спроектирована мебель. Все решения соответствуют чертежам.',
    thumbnail: '/images/Большой проект. Пример/main.jpg',
    images: [
      { id: 1, alt: 'Главный вид проекта', src: '/images/Большой проект. Пример/main.jpg' },
      { id: 2, alt: 'План — страница 2', src: '/images/Большой проект. Пример/Page2.jpg' },
      { id: 3, alt: 'План — страница 3', src: '/images/Большой проект. Пример/Page3.jpg' },
      { id: 4, alt: 'План — страница 4', src: '/images/Большой проект. Пример/Page4.jpg' },
      { id: 5, alt: 'План — страница 5', src: '/images/Большой проект. Пример/Page5.jpg' },
      { id: 6, alt: 'План — страница 6', src: '/images/Большой проект. Пример/Page6.jpg' }
    ]
  },
  {
    id: 'kitchen-example-project',
    title: 'Кухня в ЖК Бригантина',
    subtitle: 'Проект кухни в современном жилом комплексе',
    area: '15 м²',
    location: 'Симферополь',
    year: '2025',
    description: 'Реальный проект современной кухни с техническими планами и детальной проработкой всех элементов. Проект включает планировку размещения техники, систему освещения и все необходимые технические решения, в том числе и розетки.',
    thumbnail: '/images/Кухня/Проект. пример/Main.jpg',
    images: [
      { id: 1, alt: 'Розетки план 1', src: '/images/Кухня/Проект. пример/Rpzetki1.jpg' },
      { id: 2, alt: 'Розетки план 2', src: '/images/Кухня/Проект. пример/Rozetki2.jpg' },
      { id: 3, alt: 'План фасадов', src: '/images/Кухня/Проект. пример/Plan_fasadov.jpg' },
      { id: 4, alt: 'В разрезе', src: '/images/Кухня/Проект. пример/V_razreze.jpg' },
      { id: 5, alt: 'Наполнение', src: '/images/Кухня/Проект. пример/Napolnenie.jpg' },
      { id: 6, alt: 'Спецификация', src: '/images/Кухня/Проект. пример/Specific.jpg' }
    ]
  },
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
  },
  {
    id: 'kitchen-ekb',
    title: 'Кухня в Екатеринбурге',
    subtitle: 'Классическая кухня',
    area: '15 м²',
    location: 'Екатеринбург',
    year: '2024',
    description: 'Классическая кухня с современными технологиями и эргономичным планированием.',
    images: [
      { id: 1, alt: 'План кухни' },
      { id: 2, alt: '3D визуализация кухни' },
      { id: 3, alt: 'Детали мебели' },
      { id: 4, alt: 'Готовая кухня' }
    ]
  },
  {
    id: 'bathroom-moscow',
    title: 'Ванная в Москве',
    subtitle: 'Современная ванная',
    area: '6 м²',
    location: 'Москва',
    year: '2024',
    description: 'Компактная ванная комната с максимальным использованием пространства.',
    images: [
      { id: 1, alt: 'План ванной комнаты' },
      { id: 2, alt: '3D визуализация' },
      { id: 3, alt: 'Детали отделки' },
      { id: 4, alt: 'Готовая ванная комната' }
    ]
  },
  {
    id: 'bedroom-kazan',
    title: 'Спальня в Казани',
    subtitle: 'Уютная спальня',
    area: '18 м²',
    location: 'Казань',
    year: '2024',
    description: 'Уютная спальня с гардеробной и продуманной системой освещения.',
    images: [
      { id: 1, alt: 'План спальни' },
      { id: 2, alt: '3D визуализация спальни' },
      { id: 3, alt: 'Гардеробная система' },
      { id: 4, alt: 'Готовая спальня' }
    ]
  }
]

export default function ProjectsPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const handleOrderProject = () => {
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

        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6">
            Все <span className="gradient-text">проекты</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-3xl mx-auto">
            Изучите наши проекты и посмотрите, как мы создаем функциональные пространства
          </p>
        </motion.div>

        {/* Сетка проектов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {allProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <Link href={`/project/${project.id}`} className="block">
                <div className="bg-background-surface/30 border border-neutral-800 rounded-2xl p-4 sm:p-6 backdrop-blur-sm hover:bg-background-surface/50 transition-all duration-300 hover:scale-105 group-hover:border-accent-500/30">
                  {/* Изображение проекта */}
                  <div className="relative aspect-video mb-4 sm:mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-accent-500/20 to-accent-600/20">
                    {project.thumbnail ? (
                      <img 
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-orange-500/30 flex items-center justify-center">
                        <div className="text-center space-y-2">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 border border-white/30 rounded-full flex items-center justify-center mx-auto">
                            <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                          </div>
                          <p className="text-sm text-white/80">Фото проект</p>
                        </div>
                      </div>
                    )}
                    
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
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 sm:mt-20"
        >
          <div className="bg-background-surface/30 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="text-xl sm:text-2xl font-medium text-neutral-200 mb-4">
              Нужен похожий проект?
            </h3>
            <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
              Создадим индивидуальный проект с учетом всех ваших пожеланий и особенностей помещения.
            </p>
            <button 
              onClick={handleOrderProject}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Заказать проект</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Модальное окно контактов */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)}
        title="Заказать проект"
        description="Оставьте контакты и мы свяжемся с вами для обсуждения вашего проекта"
      />
    </div>
  )
}
