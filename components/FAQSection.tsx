'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqItems = [
  {
    question: 'Что входит в схемы коммуникаций?',
    answer: 'Полные схемы электрики (розетки, выключатели, освещение), сантехники (водопровод, канализация), слаботочки (интернет, телевидение) и техническое задание для строителей.',
  },
  {
    question: 'Почему дизайн мебели в подарок?',
    answer: 'Чтобы правильно спланировать коммуникации, нам нужно понимать, где будет стоять мебель. Раз уж мы это делаем - показываем, как может выглядеть ваша идеальная мебель.',
  },
  {
    question: 'Обязательно ли заказывать мебель у вас?',
    answer: 'Нет, не обязательно. Получили дизайн, понравилось - остаетесь с нами. Не понравилось - берете схемы коммуникаций и идете к любому мебельщику.',
  },
  {
    question: 'Сколько времени занимает разработка техпроекта?',
    answer: 'В зависимости от сложности: ЛАЙТ - 3-5 дней, СТАНДАРТ - 7-10 дней, ПРЕМИУМ - 10-14 дней.',
  },
  {
    question: 'Можете ли вы работать с готовым ремонтом?',
    answer: 'Да, можем адаптировать схемы под существующий ремонт или предложить варианты доработки для оптимального размещения мебели.',
  },
  {
    question: 'Что делать, если не понравился дизайн мебели?',
    answer: 'Никого не держим. Берете схемы коммуникаций и идете к любому мебельщику. Стоимость дизайна уже включена в тариф.',
  },
  {
    question: 'Есть ли гарантия на схемы коммуникаций?',
    answer: 'Да, мы гарантируем точность схем. Если строители найдут ошибки - исправляем бесплатно.',
  },
  {
    question: 'Можете ли вы работать с частными домами?',
    answer: 'Да, у нас есть тариф ПРЕМИУМ специально для частных домов с учетом отопления, вентиляции и умного дома.',
  },
]

interface FAQSectionProps {
  onOpenModal?: () => void
}

export default function FAQSection({ onOpenModal }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }



  return (
    <section id="faq" className="section-padding bg-background-secondary">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6">
            Часто задаваемые <span className="gradient-text">вопросы</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto px-4">
            Ответы на популярные вопросы о наших услугах и процессе работы
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between text-left space-x-3 sm:space-x-4"
              >
                <h3 className="text-base sm:text-lg font-medium text-white pr-2 sm:pr-4">
                  {item.question}
                </h3>
                <div className="flex-shrink-0">
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
                  )}
                </div>
              </button>
              
              {openItems.includes(index) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-neutral-800"
                >
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16"
        >
          <div className="bg-background-surface/50 border border-neutral-800 rounded-xl p-4 sm:p-6 lg:p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-medium text-white mb-3 sm:mb-4">
              Остались вопросы?
            </h3>
            <p className="text-neutral-300 mb-4 sm:mb-6 text-sm sm:text-base">
              Свяжитесь с нами для получения подробной консультации
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button 
                onClick={onOpenModal}
                className="btn-primary text-sm sm:text-base"
              >
                Получить консультацию
              </button>
              <button 
                onClick={onOpenModal}
                className="btn-secondary text-sm sm:text-base"
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