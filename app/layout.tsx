import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ТехПроект - Схемы коммуникаций + Дизайн мебели | Кожа Мебель',
  description: 'Получите точные схемы коммуникаций для ремонта и дизайн мебели в подарок. 20 лет опыта в производстве корпусной и мягкой мебели. Решаем проблемы с розетками и показываем, как может выглядеть ваша идеальная мебель.',
  keywords: 'схемы коммуникаций, дизайн мебели, ремонт квартиры, электрика, розетки, мебель на заказ, кожа мебель',
  openGraph: {
    title: 'ТехПроект - Схемы коммуникаций + Дизайн мебели',
    description: 'Получите точные схемы коммуникаций для ремонта и дизайн мебели в подарок',
    type: 'website',
    locale: 'ru_RU',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 