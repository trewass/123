'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Gift, Upload, Image as ImageIcon } from 'lucide-react'
import { useState } from 'react'

interface HeroSectionProps {
  onOpenModal?: () => void
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20 sm:pt-24 md:pt-28">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-background-primary via-background-secondary to-background-primary" />
      
      {/* Декоративные элементы */}
      <div className="absolute top-20 right-4 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-4 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 bg-accent-600/5 rounded-full blur-3xl" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Левая колонка - контент */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-5 sm:space-y-6"
          >
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
                Готовый план розеток, воды и техники — чтобы строители сделали <span className="gradient-text">с первого раза</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl leading-relaxed">
                «Укажем, где розетки, свет, фартук и техника — всё по мебели, без сюрпризов»
              </p>
            </div>

            {/* 3 ключевые выгоды */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-accent-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed">
                  Все подключения по плану мебели
                </span>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-accent-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed">
                  Фартук и розетки на нужной высоте
                </span>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-accent-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed">
                  Никаких переделок и лишних затрат
                </span>
              </div>
            </div>

            {/* Бонус */}
            <div className="bg-accent-500/10 border border-accent-500/20 rounded-xl p-3 sm:p-4">
              <div className="flex items-start space-x-3">
                <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-accent-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm sm:text-base md:text-lg text-neutral-200 font-medium">
                    🎁 Дизайн мебели в подарок
                  </span>
                </div>
              </div>
            </div>

            {/* CTA кнопка */}
            <button 
              onClick={onOpenModal}
              className="btn-primary text-base sm:text-lg md:text-xl px-6 sm:px-8 py-3 sm:py-4 flex items-center space-x-2 w-full sm:w-auto justify-center font-medium"
            >
              <span>Заказать план для ремонта</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </motion.div>

          {/* Правая колонка - загрузка проекта */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-6 lg:mt-0"
          >
            <div className="bg-background-surface/50 border border-neutral-800 rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm">
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-neutral-200">
                    Загрузите фото проекта
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-400">
                    Получите план + рендер «было/стало»
                  </p>
                </div>

                {uploadedImage ? (
                  <div className="space-y-4">
                    <div className="aspect-square bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-xl overflow-hidden">
                      <img 
                        src={uploadedImage} 
                        alt="Загруженный проект" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-sm sm:text-base text-neutral-300 font-medium">
                        Реальный план + рендер
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-400">
                        Коллаж «было/стало»
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-xl flex items-center justify-center border-2 border-dashed border-accent-500/30">
                    <label className="cursor-pointer flex flex-col items-center space-y-3 text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent-500/20 border border-accent-500/30 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-accent-500" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm sm:text-base text-neutral-300 font-medium">
                          Нажмите для загрузки
                        </p>
                        <p className="text-xs sm:text-sm text-neutral-400">
                          JPG, PNG до 5MB
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 