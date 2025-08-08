'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface FooterProps {
  onOpenModal?: () => void
}

export default function Footer({ onOpenModal }: FooterProps) {


  return (
    <footer id="contact" className="bg-background-surface border-t border-neutral-800">
      <div className="container-max py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* О компании */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">Т</span>
              </div>
              <span className="text-white font-medium text-base sm:text-lg">ТехПроект</span>
            </div>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              Профессиональные схемы коммуникаций и дизайн мебели. 
              20 лет опыта в производстве корпусной и мягкой мебели.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={onOpenModal}
                className="btn-primary text-xs sm:text-sm"
              >
                Получить консультацию
              </button>
            </div>
          </div>

          {/* Услуги */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-white font-medium text-base sm:text-lg">Услуги</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link 
                  href="#pricing" 
                  className="text-neutral-300 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Схемы коммуникаций
                </Link>
              </li>
              <li>
                <Link 
                  href="#pricing" 
                  className="text-neutral-300 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Дизайн мебели
                </Link>
              </li>
              <li>
                <Link 
                  href="#examples" 
                  className="text-neutral-300 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Примеры проектов
                </Link>
              </li>
              <li>
                <Link 
                  href="/case" 
                  className="text-neutral-300 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Реальные кейсы
                </Link>
              </li>
              <li>
                <Link 
                  href="/media" 
                  className="text-neutral-300 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Медиа материалы
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-white font-medium text-base sm:text-lg">Контакты</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-accent-500" />
                <a 
                  href="tel:+79781803971" 
                  className="text-neutral-300 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  +7 (978) 180-39-71
                </a>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-accent-500" />
                <a 
                  href="mailto:info@techproekt.ru" 
                  className="text-neutral-300 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  info@techproekt.ru
                </a>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-accent-500 mt-0.5" />
                <span className="text-neutral-300 text-xs sm:text-sm">
                  Республика Крым, г. Симферополь
                </span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-accent-500" />
                <span className="text-neutral-300 text-xs sm:text-sm">
                  Пн-Пт: 9:00-18:00
                </span>
              </div>
            </div>
          </div>

          {/* Быстрые действия */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-white font-medium text-base sm:text-lg">Быстро</h3>
            <div className="space-y-2 sm:space-y-3">
              <button 
                onClick={onOpenModal}
                className="flex items-center space-x-2 text-neutral-300 hover:text-white transition-colors text-xs sm:text-sm"
              >
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Получить примеры</span>
              </button>
              <button 
                onClick={onOpenModal}
                className="flex items-center space-x-2 text-neutral-300 hover:text-white transition-colors text-xs sm:text-sm"
              >
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Заказать звонок</span>
              </button>
              <button 
                onClick={onOpenModal}
                className="flex items-center space-x-2 text-neutral-300 hover:text-white transition-colors text-xs sm:text-sm"
              >
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Рассчитать стоимость</span>
              </button>
            </div>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className="border-t border-neutral-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-neutral-400 text-xs sm:text-sm">
              © 2024 ТехПроект. Все права защищены.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
              <Link 
                href="#" 
                className="text-neutral-400 hover:text-white transition-colors text-xs sm:text-sm"
              >
                Политика конфиденциальности
              </Link>
              <Link 
                href="#" 
                className="text-neutral-400 hover:text-white transition-colors text-xs sm:text-sm"
              >
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 