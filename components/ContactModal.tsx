'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, User, Download, ArrowRight, X } from 'lucide-react'

interface FormData {
  name: string
  phone: string
}

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
}

export default function ContactModal({ isOpen, onClose, title = "Получить примеры", description = "Оставьте контакты и получите примеры техпроектов с дизайном мебели" }: ContactModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '+79781803971',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Имитация отправки формы
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Здесь будет реальная отправка данных в CRM
    console.log('Form submitted:', formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleClose = () => {
    setIsSubmitted(false)
    setFormData({ name: '', phone: '+79781803971' })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-background-surface border border-neutral-800 rounded-xl max-w-md w-full relative"
          >
            {/* Кнопка закрытия */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {isSubmitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-accent-500/20 border border-accent-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-accent-500" />
                </div>
                <h3 className="text-2xl font-medium text-white mb-2">Спасибо!</h3>
                <p className="text-neutral-300 mb-6">
                  Ваша заявка принята. Мы свяжемся с вами в ближайшее время для уточнения деталей.
                </p>
                <button
                  onClick={handleClose}
                  className="btn-primary"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-medium text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-neutral-300 text-sm">
                    {description}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-white">
                      Имя
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-background-primary border border-neutral-800 rounded-lg text-white placeholder-neutral-400 focus:border-accent-500 focus:outline-none transition-colors"
                        placeholder="Ваше имя"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-white">
                      Телефон
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-background-primary border border-neutral-800 rounded-lg text-white placeholder-neutral-400 focus:border-accent-500 focus:outline-none transition-colors"
                        placeholder="+7 (978) 180-39-71"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Отправляем...</span>
                      </>
                    ) : (
                      <>
                        <span>Получить примеры</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-neutral-400 text-xs text-center">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 