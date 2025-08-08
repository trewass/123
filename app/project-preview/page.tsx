'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Download, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function ProjectPreviewPage() {
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
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-4 sm:mb-6">
            Реальный план + <span className="gradient-text">рендер</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto">
            Пример готового проекта: план розеток и рендер кухни
          </p>
        </motion.div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* План розеток */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-background-surface/50 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-400 text-2xl sm:text-3xl">⚡</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-neutral-200">
                    План розеток
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-400">
                    Точное расположение всех подключений
                  </p>
                </div>

                <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/20">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-blue-400 text-4xl sm:text-5xl">📋</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm sm:text-base text-neutral-300 font-medium">
                        Схема подключений
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-400">
                        Розетки, выключатели, освещение
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <button className="btn-secondary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 flex items-center space-x-2">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Скачать план</span>
                  </button>
                  <button className="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 flex items-center space-x-2">
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Подробнее</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Рендер кухни */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-background-surface/50 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-500/20 border border-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-orange-400 text-2xl sm:text-3xl">🏠</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-neutral-200">
                    Рендер кухни
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-400">
                    3D визуализация интерьера
                  </p>
                </div>

                <div className="aspect-square bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl flex items-center justify-center border border-orange-500/20">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-orange-500/20 border border-orange-500/30 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-orange-400 text-4xl sm:text-5xl">🎨</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm sm:text-base text-neutral-300 font-medium">
                        3D визуализация
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-400">
                        Мебель, техника, освещение
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <button className="btn-secondary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 flex items-center space-x-2">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Скачать рендер</span>
                  </button>
                  <button className="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 flex items-center space-x-2">
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Подробнее</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 sm:mt-16"
        >
          <div className="bg-background-surface/30 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-500/20 border border-accent-500/30 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-accent-400 text-lg sm:text-xl">⚡</span>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-neutral-200">
                  Электрика
                </h3>
                <p className="text-sm sm:text-base text-neutral-400">
                  Розетки, выключатели, освещение
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-500/20 border border-accent-500/30 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-accent-400 text-lg sm:text-xl">🚰</span>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-neutral-200">
                  Сантехника
                </h3>
                <p className="text-sm sm:text-base text-neutral-400">
                  Водопровод, канализация, выводы
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-500/20 border border-accent-500/30 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-accent-400 text-lg sm:text-xl">🏠</span>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-neutral-200">
                  Мебель
                </h3>
                <p className="text-sm sm:text-base text-neutral-400">
                  Кухня, шкафы, техника
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
