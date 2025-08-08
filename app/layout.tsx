'use client'

import './globals.css'
import { useEffect } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Обработчик для открытия ContactModal с других страниц
    const handleOpenContactModal = () => {
      // Находим кнопку открытия модального окна на главной странице
      const openModalButton = document.querySelector('[data-open-modal]') as HTMLButtonElement
      if (openModalButton) {
        openModalButton.click()
      }
    }

    window.addEventListener('openContactModal', handleOpenContactModal)

    return () => {
      window.removeEventListener('openContactModal', handleOpenContactModal)
    }
  }, [])

  return (
    <html lang="ru">
      <body className="bg-background-primary text-white">
        {children}
      </body>
    </html>
  )
} 