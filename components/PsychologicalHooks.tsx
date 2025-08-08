'use client'

import { motion } from 'framer-motion'
import { Users, Shield, Factory, Award } from 'lucide-react'

const hooks = [
  {
    icon: Users,
    title: 'Почему мы так делаем?',
    content: '20 лет делаем мебель и видим одну проблему: люди заказывают мебель, не подумав о коммуникациях. Потом дорогие переделки. Мы решили: давайте сначала поможем с коммуникациями, а заодно покажем, как может выглядеть красивая и функциональная мебель.',
    accent: 'accent-500',
  },
  {
    icon: Shield,
    title: 'Без навязывания',
    content: 'Получили дизайн, понравилось - остаетесь с нами. Не понравилось - берете схемы коммуникаций и идете куда хотите. Никого не держим.',
    accent: 'accent-400',
  },
  {
    icon: Factory,
    title: 'Экспертность',
    content: 'Мы не дизайн-студия. Мы производство с 20-летним опытом. Знаем, как делается мебель, поэтому можем спроектировать её правильно.',
    accent: 'accent-600',
  },
  {
    icon: Award,
    title: 'Результат',
    content: 'Клиенты получают больше, чем ожидали. Решают проблему с коммуникациями и получают красивую мебель от надежного производителя.',
    accent: 'accent-500',
  },
]

export default function PsychologicalHooks() {
  return (
    <section className="section-padding bg-background-primary">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Психологические <span className="gradient-text">крючки</span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Объясняем нашу стратегию и почему она работает
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {hooks.map((hook, index) => (
            <motion.div
              key={hook.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-${hook.accent}/10 border border-${hook.accent}/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <hook.icon className={`w-6 h-6 text-${hook.accent}`} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-medium text-white">{hook.title}</h3>
                  <p className="text-neutral-300 leading-relaxed">{hook.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Дополнительный блок с визуализацией */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-background-surface/50 border border-neutral-800 rounded-xl p-8">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-medium text-white">Визуализация производства</h3>
                <p className="text-neutral-300">
                  Фото: Ваше производство, готовая мебель
                </p>
                <p className="text-neutral-400 text-sm">
                  Мы не дизайн-студия. Мы производство с 20-летним опытом. 
                  Знаем, как делается мебель, поэтому можем спроектировать её правильно.
                </p>
              </div>
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-[4/3] bg-gradient-to-br from-neutral-600/20 to-neutral-700/20 rounded-lg border border-neutral-600/30 flex items-center justify-center">
                    <span className="text-neutral-400 text-sm">Производство</span>
                  </div>
                  <div className="aspect-[4/3] bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-lg border border-accent-500/30 flex items-center justify-center">
                    <span className="text-accent-400 text-sm">Готовая мебель</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 