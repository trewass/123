'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Star, ArrowRight } from 'lucide-react'

const pricingPlans = [
  {
    name: 'ЛАЙТ',
    price: '25 000 ₽',
    subtitle: 'Схема кухни + концепт мебели',
    description: 'Идеально для тех, кто начинает с кухни',
    mainFeatures: [
      'Схема всех коммуникаций для кухни',
      'Техзадание для электрика и сантехника',
    ],
    bonusFeatures: [
      '3D визуализация кухни',
      'Концепция планировки и стиля',
      'Ориентировочный бюджет на мебель',
    ],
    popular: false,
  },
  {
    name: 'СТАНДАРТ',
    price: '75 000 ₽',
    subtitle: 'Схемы квартиры + дизайн всех комнат',
    description: 'Полное решение для всей квартиры',
    mainFeatures: [
      'Полные схемы коммуникаций',
      'Электрика, сантехника, слаботочка',
    ],
    bonusFeatures: [
      '3D дизайн мебели для всех комнат',
      'Стилевая концепция интерьера',
      'Примерные бюджеты по комнатам',
    ],
    popular: true,
  },
  {
    name: 'ПРЕМИУМ',
    price: '150 000 ₽',
    subtitle: 'Полные схемы дома + дизайн-проект',
    description: 'Комплексное решение для частного дома',
    mainFeatures: [
      'Все коммуникации включая отопление, вентиляцию',
      'Схемы умного дома',
    ],
    bonusFeatures: [
      'Полный дизайн-проект мебели',
      'Подбор конкретных материалов',
      'Смета на производство мебели',
    ],
    popular: false,
  },
]

interface PricingSectionProps {
  onOpenModal?: () => void
}

export default function PricingSection({ onOpenModal }: PricingSectionProps) {


  return (
    <section id="pricing" className="section-padding bg-background-secondary">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6">
            Тарифы - <span className="gradient-text">мягкий заход</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto px-4">
            Выберите подходящий тариф и получите схемы коммуникаций + дизайн мебели в подарок
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative card ${
                plan.popular ? 'border-accent-500/50 bg-background-surface/80' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-accent-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center space-x-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Популярный</span>
                  </div>
                </div>
              )}

              <div className="space-y-4 sm:space-y-6">
                {/* Заголовок и цена */}
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-medium text-white mb-2">{plan.name}</h3>
                  <div className="text-2xl sm:text-3xl font-light text-white mb-1">{plan.price}</div>
                  <p className="text-accent-400 font-medium text-xs sm:text-sm mb-2">{plan.subtitle}</p>
                  <p className="text-neutral-400 text-xs sm:text-sm">{plan.description}</p>
                </div>

                {/* Основные функции */}
                <div className="space-y-2 sm:space-y-3">
                  <h4 className="text-white font-medium text-xs sm:text-sm">Основное (за что платят):</h4>
                  <ul className="space-y-1 sm:space-y-2">
                    {plan.mainFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-neutral-300">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-accent-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Бонусные функции */}
                <div className="space-y-2 sm:space-y-3">
                  <h4 className="text-accent-400 font-medium text-xs sm:text-sm flex items-center space-x-2">
                    <span>🎁 Бонус (создаем wow-эффект):</span>
                  </h4>
                  <ul className="space-y-1 sm:space-y-2">
                    {plan.bonusFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-neutral-300">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-accent-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA кнопка */}
                <button 
                  onClick={onOpenModal}
                  className="btn-primary w-full flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <span>Выбрать {plan.name}</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Дополнительные варианты */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-light mb-4">
              Понравился дизайн мебели? <span className="gradient-text">Есть варианты!</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="card"
            >
              <h4 className="text-lg sm:text-xl font-medium text-white mb-3 sm:mb-4">
                Вариант 1: Берите чертежи и идите к любому мебельщику
              </h4>
              <p className="text-neutral-300 mb-3 sm:mb-4 text-sm">Хотите полные рабочие чертежи?</p>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-neutral-300 mb-4 sm:mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-accent-500 mt-0.5 flex-shrink-0" />
                  <span>Доплачиваете 50% от стоимости тарифа</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-accent-500 mt-0.5 flex-shrink-0" />
                  <span>Получаете готовые чертежи для производства</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-accent-500 mt-0.5 flex-shrink-0" />
                  <span>Идете к любому мебельному производству</span>
                </li>
              </ul>
              <button 
                onClick={onOpenModal}
                className="btn-secondary w-full text-sm sm:text-base"
              >
                Получить чертежи
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              viewport={{ once: true }}
              className="card border-accent-500/50 bg-background-surface/80"
            >
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-accent-500" />
                <h4 className="text-lg sm:text-xl font-medium text-white">
                  Вариант 2: Оставайтесь с нами - сделаем мебель
                </h4>
              </div>
              <p className="text-neutral-300 mb-3 sm:mb-4 text-sm">Понравился наш подход?</p>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-neutral-300 mb-4 sm:mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-accent-500 mt-0.5 flex-shrink-0" />
                  <span>Изготовим мебель в нашем производстве</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-accent-500 mt-0.5 flex-shrink-0" />
                  <span>Стоимость дизайна засчитывается в стоимость мебели</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-accent-500 mt-0.5 flex-shrink-0" />
                  <span>Гарантия полного соответствия проекту</span>
                </li>
              </ul>
              <button 
                onClick={onOpenModal}
                className="btn-primary w-full text-sm sm:text-base"
              >
                Заказать мебель
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 