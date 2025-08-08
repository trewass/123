'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Zap, Shield, Clock } from 'lucide-react'

interface ReadySchemesSectionProps {
  onOpenModal?: () => void
}

export default function ReadySchemesSection({ onOpenModal }: ReadySchemesSectionProps) {
  const benefits = [
    {
      icon: Zap,
      title: 'Бесплатные схемы при заказе мебели у нас',
      description: 'Стоимость проекта полностью засчитывается в заказ'
    },
    {
      icon: Shield,
      title: 'Гарантия точного совпадения проекта и готового изделия',
      description: 'Мебель изготовлена точно по вашим схемам'
    },
    {
      icon: Clock,
      title: 'Экономия времени: без повторных замеров и согласований',
      description: 'Все уже продумано и согласовано'
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Левая колонка - визуал */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Рендер кухни */}
            <div className="relative mb-4">
              <div className="aspect-[4/3] bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-xl border border-accent-500/30 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-accent-500/20 border border-accent-500/30 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-accent-500 text-2xl">🏠</span>
                  </div>
                  <p className="text-accent-600 dark:text-accent-400 text-sm font-medium">Рендер кухни</p>
                </div>
              </div>
            </div>
            
            {/* Фрагмент плана (наложенный) */}
            <div className="absolute -top-2 -right-2 w-32 h-24 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30 flex items-center justify-center transform rotate-6">
              <div className="text-center space-y-1">
                <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded flex items-center justify-center mx-auto">
                  <span className="text-blue-500 text-sm">📐</span>
                </div>
                <p className="text-blue-600 dark:text-blue-400 text-xs">План розеток</p>
              </div>
            </div>
          </motion.div>

          {/* Правая колонка - контент */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Заголовок */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-neutral-900 dark:text-white">
                Готовые схемы — это только{' '}
                <span className="gradient-text">начало</span>
              </h2>
              <p className="text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 font-medium">
                Сделаем для вас мебель по тем же схемам, и стоимость проекта вернём вам в зачёт мебели.
              </p>
            </div>

            {/* Основной текст */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Когда вы заказываете мебель в нашей компании, сумма, которую вы заплатили за готовые схемы коммуникаций и дизайн мебели, засчитывается в стоимость заказа. По сути, планы розеток, воды и фартука достаются вам бесплатно — и при этом ваша мебель будет изготовлена точно по этим проектам, без ошибок и переделок.
            </p>

            {/* Список выгод */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-medium text-neutral-900 dark:text-white">
                Ваши выгоды:
              </h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-8 h-8 bg-accent-500/20 border border-accent-500/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <benefit.icon className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm sm:text-base font-medium text-neutral-900 dark:text-white">
                        {benefit.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA кнопка */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              onClick={onOpenModal}
              className="group bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
            >
              <span>Заказать план розеток и мебели</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
