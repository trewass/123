'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Star } from 'lucide-react'

interface PricingSectionProps {
  onOpenModal?: () => void
}

export default function PricingSection({ onOpenModal }: PricingSectionProps) {
  const basicFeatures = [
    'План розеток и освещения',
    'Схема сантехники',
    'План размещения техники',
    '3D визуализация мебели'
  ]

  const standardFeatures = [
    'Все из базового тарифа',
    'Детальные чертежи для производства',
    'Техническая документация',
    'Консультация по материалам'
  ]

  const premiumFeatures = [
    'Все из стандартного тарифа',
    'Авторский надзор',
    'Подбор материалов и мебели',
    'Гарантия качества'
  ]

  return (
    <section id="pricing" className="section-padding bg-background-primary">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6">
            <span className="gradient-text">Тарифы</span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-3xl mx-auto">
            Выберите подходящий вариант для вашего проекта
          </p>
        </motion.div>

        {/* Тарифы */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Базовый тариф */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-background-surface/30 border border-neutral-800 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-500/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-medium text-neutral-200 mb-2">
                Базовый
              </h3>
              <p className="text-neutral-400 mb-4">
                Для простых проектов
              </p>
              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-light text-neutral-200">25 000</span>
                <span className="text-lg text-neutral-400 ml-1">₽</span>
              </div>
              <ul className="space-y-3 mb-6">
                {basicFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={onOpenModal}
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
              >
                Выбрать
              </button>
            </div>
          </motion.div>

          {/* Стандартный тариф */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-background-surface/30 border border-accent-500/30 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-5 h-5 text-accent-400" />
                <span className="text-accent-400 text-sm font-medium">Рекомендуемый</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-neutral-200 mb-2">
                Стандартный
              </h3>
              <p className="text-neutral-400 mb-4">
                Для большинства проектов
              </p>
              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-light text-neutral-200">60 000</span>
                <span className="text-lg text-neutral-400 ml-1">₽</span>
              </div>
              <ul className="space-y-3 mb-6">
                {standardFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={onOpenModal}
                className="w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
              >
                Выбрать
              </button>
            </div>
          </motion.div>

          {/* Премиум тариф */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-background-surface/30 border border-neutral-800 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-600/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-medium text-neutral-200 mb-2">
                Премиум
              </h3>
              <p className="text-neutral-400 mb-4">
                Для сложных проектов
              </p>
              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-light text-neutral-200">120 000</span>
                <span className="text-lg text-neutral-400 ml-1">₽</span>
              </div>
              <ul className="space-y-3 mb-6">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={onOpenModal}
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
              >
                Выбрать
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
