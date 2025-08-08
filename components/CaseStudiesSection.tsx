'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Star, User } from 'lucide-react'

const caseStudies = [
  {
    id: 1,
    client: 'Денис',
    title: 'Как Денис получил больше, чем ожидал',
    task: 'Нужны схемы розеток для кухни',
    process: 'Делаем схемы, заодно показываем 3D кухни',
    result: 'Дениса впечатлил дизайн, заказал всю кухню',
    benefits: [
      'Решил проблему с коммуникациями',
      'Получил красивую кухню',
      'Сэкономил на поиске дизайнера',
      'Нашел надежного производителя',
    ],
    beforeAfter: {
      before: '/api/cases/denis-before',
      after: '/api/cases/denis-after',
    },
    rating: 5,
    testimonial: 'Пришел за схемами, получил готовую кухню. Очень доволен результатом!',
  },
  {
    id: 2,
    client: 'Анна',
    title: 'Анна: от ремонта до полного обновления интерьера',
    task: 'Планирование электрики для всей квартиры',
    process: 'Создали схемы + показали дизайн мебели для всех комнат',
    result: 'Анна заказала мебель для всей квартиры',
    benefits: [
      'Полное планирование коммуникаций',
      'Единый стиль для всей квартиры',
      'Экономия на дизайнере',
      'Гарантия качества от производителя',
    ],
    beforeAfter: {
      before: '/api/cases/anna-before',
      after: '/api/cases/anna-after',
    },
    rating: 5,
    testimonial: 'Профессиональный подход. Все сделали точно в срок!',
  },
  {
    id: 3,
    client: 'Михаил',
    title: 'Михаил: частный дом - комплексное решение',
    task: 'Схемы коммуникаций для частного дома',
    process: 'Полный техпроект включая отопление и умный дом',
    result: 'Михаил заказал мебель и систему умного дома',
    benefits: [
      'Комплексное планирование дома',
      'Интеграция умных систем',
      'Энергоэффективные решения',
      'Полная автоматизация',
    ],
    beforeAfter: {
      before: '/api/cases/mikhail-before',
      after: '/api/cases/mikhail-after',
    },
    rating: 5,
    testimonial: 'Отличная работа! Дом получился современным и функциональным.',
  },
]

export default function CaseStudiesSection() {
  return (
    <section className="section-padding bg-background-primary">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6">
            Примеры <span className="gradient-text">работ</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto px-4">
            Показываем путь клиента от схем коммуникаций к готовой мебели
          </p>
        </motion.div>

        <div className="space-y-8 sm:space-y-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Левая колонка - история */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-accent-500" />
                      <span className="text-accent-400 font-medium text-sm sm:text-base">{study.client}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-medium text-white">{study.title}</h3>
                  </div>

                  {/* Путь клиента */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="space-y-1 sm:space-y-2">
                      <h4 className="text-white font-medium text-sm sm:text-base">Задача:</h4>
                      <p className="text-neutral-300 text-sm sm:text-base">{study.task}</p>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <h4 className="text-white font-medium text-sm sm:text-base">Процесс:</h4>
                      <p className="text-neutral-300 text-sm sm:text-base">{study.process}</p>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <h4 className="text-white font-medium text-sm sm:text-base">Результат:</h4>
                      <p className="text-neutral-300 text-sm sm:text-base">{study.result}</p>
                    </div>
                  </div>

                  {/* Что получил */}
                  <div className="space-y-2 sm:space-y-3">
                    <h4 className="text-white font-medium text-sm sm:text-base">Что получил:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                      {study.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-accent-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-neutral-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Отзыв */}
                  <div className="bg-background-surface/50 border border-neutral-800 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex space-x-1">
                        {[...Array(study.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-accent-500 fill-current" />
                        ))}
                      </div>
                      <span className="text-neutral-400 text-xs sm:text-sm">{study.rating}/5</span>
                    </div>
                    <p className="text-neutral-300 text-xs sm:text-sm italic">"{study.testimonial}"</p>
                  </div>
                </div>

                {/* Правая колонка - до/после */}
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-white font-medium text-sm sm:text-base">До/После:</h4>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1 sm:space-y-2">
                      <span className="text-neutral-400 text-xs sm:text-sm">До:</span>
                      <div className="aspect-[4/3] bg-gradient-to-br from-neutral-600/20 to-neutral-700/20 rounded-lg border border-neutral-600/30 flex items-center justify-center">
                        <span className="text-neutral-400 text-xs sm:text-sm">Фото до</span>
                      </div>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <span className="text-neutral-400 text-xs sm:text-sm">После:</span>
                      <div className="aspect-[4/3] bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-lg border border-accent-500/30 flex items-center justify-center">
                        <span className="text-accent-400 text-xs sm:text-sm">Фото после</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Дополнительные кейсы */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16"
        >
          <div className="bg-background-surface/50 border border-neutral-800 rounded-xl p-4 sm:p-6 lg:p-8">
            <div className="text-center space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl font-medium text-white">
                Другие успешные кейсы клиентов
              </h3>
              <p className="text-neutral-300 max-w-2xl mx-auto text-sm sm:text-base">
                Демонстрирующие полный путь от схем коммуникаций к готовой мебели. 
                Каждый клиент получает больше, чем ожидал.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 sm:mt-8">
                <div className="text-center space-y-1 sm:space-y-2">
                  <div className="text-2xl sm:text-3xl font-light text-accent-500">50+</div>
                  <div className="text-neutral-400 text-xs sm:text-sm">Реализованных проектов</div>
                </div>
                <div className="text-center space-y-1 sm:space-y-2">
                  <div className="text-2xl sm:text-3xl font-light text-accent-500">95%</div>
                  <div className="text-neutral-400 text-xs sm:text-sm">Клиентов заказывают мебель</div>
                </div>
                <div className="text-center space-y-1 sm:space-y-2">
                  <div className="text-2xl sm:text-3xl font-light text-accent-500">4.9</div>
                  <div className="text-neutral-400 text-xs sm:text-sm">Средняя оценка</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 