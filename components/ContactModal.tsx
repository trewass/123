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
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: '', // Пока не используем email
          message: '', // Пока не используем сообщение
          source: 'website',
          page: window.location.pathname
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setIsSubmitted(true)
        console.log('Заявка успешно отправлена:', result)
      } else {
        throw new Error(result.message || 'Ошибка отправки')
      }
      
    } catch (error) {
      console.error('Ошибка отправки заявки:', error)
      alert('Ошибка отправки заявки. Попробуйте позже.')
    } finally {
      setIsSubmitting(false)
    }
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
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {isSubmitted ? (
              <div className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-500/20 border border-accent-500/30 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Download className="w-6 h-6 sm:w-8 sm:h-8 text-accent-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-medium text-white mb-2">Спасибо!</h3>
                <p className="text-neutral-300 mb-4 sm:mb-6 text-sm sm:text-base">
                  Ваша заявка принята. Мы свяжемся с вами в ближайшее время для уточнения деталей.
                </p>
                <button
                  onClick={handleClose}
                  className="btn-primary text-sm sm:text-base"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-medium text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-neutral-300 text-xs sm:text-sm">
                    {description}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs sm:text-sm font-medium text-white">
                      Имя
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-background-primary border border-neutral-800 rounded-lg text-white placeholder-neutral-400 focus:border-accent-500 focus:outline-none transition-colors text-sm sm:text-base"
                        placeholder="Ваше имя"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs sm:text-sm font-medium text-white">
                      Телефон
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-background-primary border border-neutral-800 rounded-lg text-white placeholder-neutral-400 focus:border-accent-500 focus:outline-none transition-colors text-sm sm:text-base"
                        placeholder="+7 (978) 180-39-71"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Отправляем...</span>
                      </>
                    ) : (
                      <>
                        <span>Получить примеры</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
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