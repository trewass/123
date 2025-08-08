'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Gift } from 'lucide-react'

interface HeroSectionProps {
  onOpenModal?: () => void
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-16">
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
                Схемы <span className="gradient-text">коммуникаций</span> + Дизайн мебели
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl">
                Получите точные схемы для ремонта и дизайн мебели в подарок. 
                20 лет опыта в производстве корпусной и мягкой мебели.
              </p>
            </div>

            {/* Преимущества */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-accent-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-neutral-300">Решаем проблемы с розетками</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-accent-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-neutral-300">Показываем, как может выглядеть ваша мебель</span>
              </div>
              <div className="flex items-start space-x-3">
                <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-accent-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-neutral-300">Дизайн мебели в подарок</span>
              </div>
            </div>

            {/* CTA кнопка */}
            <button 
              onClick={onOpenModal}
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <span>Получить схемы + дизайн</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </motion.div>

          {/* Правая колонка - визуализация */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="bg-background-surface/50 border border-neutral-800 rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm">
              <div className="aspect-square bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-xl flex items-center justify-center">
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent-500/20 border border-accent-500/30 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-accent-500 text-xl sm:text-2xl">🏗️</span>
                  </div>
                  <p className="text-neutral-300 text-xs sm:text-sm">
                    Визуализация вашего проекта
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 