'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

interface NavbarProps {
  onOpenModal?: () => void
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Главная', href: '#home' },
    { name: 'Тарифы', href: '#pricing' },
    { name: 'Примеры', href: '#examples' },
    { name: 'Кейсы', href: '/case' },
    { name: 'Медиа', href: '/media' },
    { name: 'Контакты', href: '#contact' },
  ]

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        // Добавляем небольшой отступ для фиксированной навигации
        const offset = 80
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
      }
    } else if (href.startsWith('/')) {
      window.location.href = href
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'backdrop-blur-nav' : 'bg-transparent'
    }`}>
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <Link href="#home" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Т</span>
            </div>
            <span className="text-white font-medium">ТехПроект</span>
          </Link>

          {/* Десктопное меню */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-neutral-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </button>
            ))}
            <button 
              onClick={onOpenModal}
              data-open-modal
              className="btn-primary text-sm"
            >
              Получить схемы
            </button>
          </div>

          {/* Мобильное меню кнопка */}
          <button
            className="md:hidden text-neutral-300 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Мобильное меню */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background-surface border-t border-neutral-800">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavClick(item.href)
                    setIsOpen(false)
                  }}
                  className="block text-neutral-300 hover:text-white transition-colors duration-200 text-base font-medium w-full text-left"
                >
                  {item.name}
                </button>
              ))}
              <button 
                onClick={() => {
                  onOpenModal?.()
                  setIsOpen(false)
                }}
                data-open-modal
                className="btn-primary w-full mt-4"
              >
                Получить схемы
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 