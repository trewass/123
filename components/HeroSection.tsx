'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Gift, MapPin, Wrench, ChefHat } from 'lucide-react'

interface HeroSectionProps {
  onOpenModal?: () => void
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-24 sm:pt-28 md:pt-32">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-background-primary via-background-secondary to-background-primary" />
      
      {/* Декоративные элементы */}
      <div className="absolute top-20 right-4 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-4 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 bg-accent-600/5 rounded-full blur-3xl" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Левая колонка - контент */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-tight">
                План розеток, воды и техники для ремонта <span className="gradient-text">без переделок</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 max-w-3xl leading-relaxed">
                Сразу укажем строителям, где розетки, свет, фартук и техника — всё по мебели, без сюрпризов.
              </p>
            </div>

            {/* 3 ключевые выгоды */}
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-accent-500 mt-1 flex-shrink-0" />
                <span className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed">
                  Все подключения на своих местах.
                </span>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-accent-500 mt-1 flex-shrink-0" />
                <span className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed">
                  Фартук и розетки на нужной высоте.
                </span>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-accent-500 mt-1 flex-shrink-0" />
                <span className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed">
                  Экономия времени и денег на переделках.
                </span>
              </div>
            </div>

            {/* Бонус */}
            <div className="bg-accent-500/10 border border-accent-500/20 rounded-xl p-4 sm:p-6">
              <div className="flex items-start space-x-3">
                <Gift className="w-6 h-6 sm:w-7 sm:h-7 text-accent-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-base sm:text-lg md:text-xl text-neutral-200 font-medium">
                    🎁 Дизайн мебели в подарок
                  </span>
                </div>
              </div>
            </div>

            {/* CTA кнопка */}
            <button 
              onClick={onOpenModal}
              className="btn-primary text-lg sm:text-xl md:text-2xl px-8 sm:px-10 py-4 sm:py-5 flex items-center space-x-3 w-full sm:w-auto justify-center font-medium"
            >
              <span>Заказать план для ремонта</span>
              <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </motion.div>

          {/* Правая колонка - визуализация */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="bg-background-surface/50 border border-neutral-800 rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm">
              <div className="aspect-square bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-xl flex items-center justify-center">
                <div className="text-center space-y-4 sm:space-y-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-accent-500/20 border border-accent-500/30 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-accent-500 text-2xl sm:text-3xl">🏗️</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-neutral-300 text-sm sm:text-base font-medium">
                      Визуализация проекта
                    </p>
                    <p className="text-neutral-400 text-xs sm:text-sm">
                      Схемы + 3D дизайн мебели
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 