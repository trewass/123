'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Gift } from 'lucide-react'

interface HeroSectionProps {
  onOpenModal?: () => void
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-background-primary via-background-secondary to-background-primary" />
      
      {/* Декоративные элементы */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-600/5 rounded-full blur-3xl" />

      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка - контент */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
                Схемы <span className="gradient-text">коммуникаций</span> + Дизайн мебели
              </h1>
              <p className="text-xl text-neutral-300 max-w-2xl">
                Получите точные схемы для ремонта и дизайн мебели в подарок. 
                20 лет опыта в производстве корпусной и мягкой мебели.
              </p>
            </div>

            {/* Преимущества */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-accent-500" />
                <span className="text-neutral-300">Решаем проблемы с розетками</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-accent-500" />
                <span className="text-neutral-300">Показываем, как может выглядеть ваша мебель</span>
              </div>
              <div className="flex items-center space-x-3">
                <Gift className="w-6 h-6 text-accent-500" />
                <span className="text-neutral-300">Дизайн мебели в подарок</span>
              </div>
            </div>

            {/* CTA кнопка */}
            <button 
              onClick={onOpenModal}
              className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
            >
              <span>Получить схемы + дизайн</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>

          {/* Правая колонка - визуализация */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-background-surface/50 border border-neutral-800 rounded-2xl p-8 backdrop-blur-sm">
              <div className="aspect-square bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-accent-500/20 border border-accent-500/30 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-accent-500 text-2xl">🏗️</span>
                  </div>
                  <p className="text-neutral-300 text-sm">
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