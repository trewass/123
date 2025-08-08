'use client'

import { motion } from 'framer-motion'
import { FileText, ArrowRight, Download, Eye } from 'lucide-react'
import Link from 'next/link'

interface DocumentsSectionProps {
  onOpenModal?: () => void
}

export default function DocumentsSection({ onOpenModal }: DocumentsSectionProps) {
  const documents = [
    {
      name: 'Технические условия',
      description: 'Подробные технические условия для всех типов проектов',
      icon: '📋',
      count: 15
    },
    {
      name: 'Стандарты качества',
      description: 'Стандарты качества и нормы для производства мебели',
      icon: '⭐',
      count: 25
    },
    {
      name: 'Монтажные инструкции',
      description: 'Пошаговые инструкции по монтажу и установке',
      icon: '🔧',
      count: 20
    }
  ]

  return (
    <section className="section-padding bg-background-primary">
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
            <span className="gradient-text">Техническая документация</span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-3xl mx-auto">
            Полный комплект технической документации для вашего проекта
          </p>
        </motion.div>

        {/* Превью документов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background-surface/30 border border-neutral-800 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group hover:border-accent-500/50 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-500/10 rounded-full blur-2xl group-hover:bg-accent-500/20 transition-all duration-300" />
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-accent-500/20 border border-accent-500/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{doc.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-neutral-200 mb-1">
                      {doc.name}
                    </h3>
                    <p className="text-sm text-neutral-400">
                      {doc.count} документов
                    </p>
                  </div>
                </div>
                <p className="text-sm text-neutral-300 mb-4 leading-relaxed">
                  {doc.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500">
                    PDF • Доступно для скачивания
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-1 text-neutral-400 hover:text-accent-400 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-neutral-400 hover:text-accent-400 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Кнопка перехода к полной документации */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link 
            href="/documents"
            className="btn-primary inline-flex items-center space-x-2 text-sm sm:text-base px-8 py-4"
          >
            <span>Открыть полную документацию</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Информационный блок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 bg-background-surface/30 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm"
        >
          <div className="text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-medium text-neutral-200">
              Техническая поддержка
            </h3>
            <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto">
              Все документы соответствуют действующим стандартам и нормам. 
              При возникновении вопросов обращайтесь к нашим специалистам.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={onOpenModal}
                className="btn-secondary text-sm sm:text-base"
              >
                Получить консультацию
              </button>
              <button 
                onClick={onOpenModal}
                className="btn-primary text-sm sm:text-base"
              >
                Заказать звонок
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 