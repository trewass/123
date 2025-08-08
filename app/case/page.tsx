'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Star, User } from 'lucide-react'
import Link from 'next/link'
import ContactModal from '@/components/ContactModal'

// Данные кейсов
const casesData = [
  {
    id: 'kitchen-moscow-family',
    title: 'Кухня для семьи в Москве',
    subtitle: 'Современная кухня с продуманной эргономикой',
    location: 'Москва',
    year: '2024',
    area: '12 м²',
    style: 'Современный',
    type: 'Кухня',
    shortDescription: 'Семья из 4 человек получила функциональную кухню, где можно готовить, принимать гостей и хранить все необходимое.',
    rating: 5,
    testimonial: 'Теперь наша кухня - это не просто место для готовки, а настоящий семейный центр. Все продумано до мелочей!',
    author: 'Семья Петровых',
    image: '/api/cases/kitchen-moscow-family'
  },
  {
    id: 'bathroom-luxury-sochi',
    title: 'Роскошная ванная в Сочи',
    subtitle: 'Премиальная ванная комната с панорамным видом',
    location: 'Сочи',
    year: '2024',
    area: '8 м²',
    style: 'Люкс',
    type: 'Ванная комната',
    shortDescription: 'Владелец апартаментов в Сочи получил роскошную ванную комнату с панорамным видом на море.',
    rating: 5,
    testimonial: 'Каждый день начинается с потрясающего вида на море. Это именно то, что я хотел!',
    author: 'Александр К.',
    image: '/api/cases/bathroom-luxury-sochi'
  },
  {
    id: 'bedroom-minimal-ekb',
    title: 'Минималистичная спальня в Екатеринбурге',
    subtitle: 'Современная спальня в стиле минимализм',
    location: 'Екатеринбург',
    year: '2024',
    area: '16 м²',
    style: 'Минимализм',
    type: 'Спальня',
    shortDescription: 'Молодая пара создала уютную спальню в стиле минимализм с достаточным местом для хранения.',
    rating: 5,
    testimonial: 'Теперь у нас есть идеальное место для отдыха. Все продумано до мелочей!',
    author: 'Мария и Дмитрий',
    image: '/api/cases/bedroom-minimal-ekb'
  },
  {
    id: 'kids-room-kazan',
    title: 'Детская комната в Казани',
    subtitle: 'Многофункциональная детская для растущего ребенка',
    location: 'Казань',
    year: '2024',
    area: '14 м²',
    style: 'Современный',
    type: 'Детская комната',
    shortDescription: 'Родители создали детскую комнату, которая растет вместе с ребенком и вмещает все необходимое.',
    rating: 5,
    testimonial: 'Наш ребенок в восторге от своей новой комнаты! Здесь есть место для всего, что ему нужно.',
    author: 'Семья Ахметовых',
    image: '/api/cases/kids-room-kazan'
  }
]

export default function CasesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
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
        <div className="mb-8 sm:mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-neutral-400 hover:text-accent-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Вернуться на главную</span>
          </Link>
        </div>

        {/* Заголовок страницы */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-200 mb-4 sm:mb-6">
            Реальные <span className="gradient-text">кейсы</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-3xl mx-auto">
            Изучите наши реальные проекты и посмотрите, как мы помогаем клиентам создавать идеальные пространства
          </p>
        </div>

        {/* Описание секции */}
        <div className="mb-12 sm:mb-16">
          <div className="bg-background-surface/30 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-500/20 border border-accent-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-accent-400" />
                </div>
                <h3 className="text-lg font-medium text-neutral-200 mb-2">Реальные клиенты</h3>
                <p className="text-sm text-neutral-400">
                  Каждый кейс основан на реальных проектах с настоящими клиентами
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-medium text-neutral-200 mb-2">Детальное описание</h3>
                <p className="text-sm text-neutral-400">
                  Полная история от проблемы до результата с фотографиями
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-neutral-200 mb-2">Готовые решения</h3>
                <p className="text-sm text-neutral-400">
                  Готовые проекты, которые можно адаптировать под ваши нужды
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Сетка кейсов */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {casesData.map((caseItem, index) => (
            <div key={caseItem.id} className="group">
              <Link href={`/case/${caseItem.id}`} className="block">
                <div className="bg-background-surface/30 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm hover:bg-background-surface/50 transition-all duration-300 hover:scale-105 group-hover:border-accent-500/30">
                  {/* Изображение кейса */}
                  <div className="relative aspect-video mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-accent-500/20 to-accent-600/20">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-orange-500/30 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                          <span className="text-white text-3xl sm:text-4xl">📋</span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-lg sm:text-xl text-white font-medium">
                            {caseItem.type}
                          </p>
                          <p className="text-sm sm:text-base text-white/80">
                            Нажмите для просмотра
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Информация о кейсе */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-medium text-neutral-200 mb-2 group-hover:text-accent-400 transition-colors">
                        {caseItem.title}
                      </h3>
                      <p className="text-sm sm:text-base text-neutral-400 mb-4">
                        {caseItem.subtitle}
                      </p>
                    </div>

                    {/* Метаданные кейса */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-accent-500/20 border border-accent-500/30 rounded-full text-xs text-accent-400">
                        {caseItem.area}
                      </span>
                      <span className="px-3 py-1 bg-neutral-800/50 border border-neutral-700 rounded-full text-xs text-neutral-300">
                        {caseItem.style}
                      </span>
                      <span className="px-3 py-1 bg-neutral-800/50 border border-neutral-700 rounded-full text-xs text-neutral-300">
                        {caseItem.location}
                      </span>
                    </div>

                    {/* Краткое описание */}
                    <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                      {caseItem.shortDescription}
                    </p>

                    {/* Отзыв клиента */}
                    <div className="bg-accent-500/10 border border-accent-500/20 rounded-xl p-4 mb-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex items-center space-x-1">
                          {[...Array(caseItem.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <div>
                          <p className="text-sm text-neutral-300 leading-relaxed mb-2">
                            "{caseItem.testimonial}"
                          </p>
                          <p className="text-xs text-accent-400 font-medium">
                            {caseItem.author}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Кнопка просмотра */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-neutral-500">
                        Детальный кейс
                      </span>
                      <div className="flex items-center space-x-1 text-accent-400 group-hover:text-accent-300 transition-colors">
                        <span className="text-sm font-medium">Смотреть кейс</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-12 sm:mt-16">
          <div className="bg-background-surface/30 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-medium text-neutral-200 mb-4">
                Хотите такой же результат?
              </h3>
              <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
                Каждый проект уникален, но мы можем адаптировать наши решения под ваши потребности. 
                Свяжитесь с нами, чтобы обсудить ваш проект.
              </p>
              <button 
                onClick={handleOpenModal}
                className="btn-primary inline-flex items-center space-x-2 text-sm sm:text-base px-8 py-4"
              >
                <span>Обсудить проект</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно контактов */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Обсудить проект"
        description="Оставьте контакты и мы свяжемся с вами для обсуждения вашего проекта"
      />
    </div>
  )
}
