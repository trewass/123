'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star, User, ExternalLink } from 'lucide-react'
import Link from 'next/link'

// Данные кейсов для главной страницы
const casesData = [
  {
    id: 'kitchen-example-project',
    title: 'Кухня в ЖК Бригантина',
    subtitle: 'Проект кухни в современном жилом комплексе',
    location: 'Симферополь',
    year: '2025',
    area: '15 м²',
    style: 'Современный',
    type: 'Кухня',
    shortDescription: 'Реальный проект кухни с детальной проработкой всех технических решений, планов и схем подключений. Включает детальную проработку электрики и розеток.',
    rating: 5,
    testimonial: 'Получили полный набор технических планов. Все четко, понятно и детально проработано!',
    author: 'Анна М.',
    image: '/images/Кухня/Проект. пример/Main.jpg',
    thumbnail: '/images/Кухня/Проект. пример/Main.jpg'
  },
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
  }
]

export default function RealCasesSection() {
  return (
    <section className="section-padding bg-background-primary">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6">
            Реальные <span className="gradient-text">кейсы</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto px-4">
            Изучите наши реальные проекты и посмотрите, как мы помогаем клиентам создавать идеальные пространства
          </p>
        </motion.div>

        {/* Сетка кейсов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {casesData.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={`/case/${caseItem.id}`} className="block">
                <div className="card hover:scale-105 transition-transform duration-300">
                  {/* Изображение кейса */}
                  <div className="relative aspect-video mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-accent-500/20 to-accent-600/20">
                    {caseItem.thumbnail ? (
                      <img 
                        src={caseItem.thumbnail}
                        alt={caseItem.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
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
                    )}
                    
                    {/* Иконка внешней ссылки */}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Информация о кейсе */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium text-neutral-200 mb-2 group-hover:text-accent-400 transition-colors">
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
            </motion.div>
          ))}
        </div>

        {/* Кнопка "Посмотреть все кейсы" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link 
            href="/case"
            className="btn-primary inline-flex items-center space-x-2 text-sm sm:text-base px-8 py-4"
          >
            <span>Посмотреть все кейсы</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
