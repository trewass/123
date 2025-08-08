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
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6">
            Наш <span className="gradient-text">подход</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto px-4">
            Объясняем нашу стратегию и почему она работает
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {hooks.map((hook, index) => (
            <motion.div
              key={hook.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-${hook.accent}/10 border border-${hook.accent}/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <hook.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${hook.accent}`} />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-xl font-medium text-white">{hook.title}</h3>
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">{hook.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Блок с командой */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16"
        >
          <div className="bg-background-surface/50 border border-neutral-800 rounded-xl p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-medium text-white mb-4">
                Кто создаёт ваш проект
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Карточка Анастасии */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-background-surface/30 border border-neutral-700 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="flex items-start space-x-4">
                  {/* Фото Анастасии */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-pink-400 text-2xl sm:text-3xl">👩‍💼</span>
                  </div>
                  
                  <div className="space-y-3 flex-1">
                    <div>
                      <h4 className="text-lg sm:text-xl font-medium text-white mb-1">
                        Анастасия
                      </h4>
                      <p className="text-sm sm:text-base text-accent-400 font-medium">
                        Дизайнер, проектировщик инженерки
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                        Отвечаю за премиальные проекты: электрика, вода, фартук, высоты и всё, что касается точности планов.
                      </p>
                      <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                        Эргономика — моё всё. Обожаю, когда проект не только красивый, но и максимально удобный в повседневной жизни.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Карточка Александра */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-background-surface/30 border border-neutral-700 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="flex items-start space-x-4">
                  {/* Фото Александра */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 text-2xl sm:text-3xl">👨‍💻</span>
                  </div>
                  
                  <div className="space-y-3 flex-1">
                    <div>
                      <h4 className="text-lg sm:text-xl font-medium text-white mb-1">
                        Александр
                      </h4>
                      <p className="text-sm sm:text-base text-accent-400 font-medium">
                        Дизайнер мебели и визуализация
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                        Делаю всё исключительно на совесть: от привязки техники до 3D-визуала, чтобы «на картинке» и в реальности совпадало до миллиметра.
                      </p>
                      <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                        Рендер для меня — это как искусство: передать атмосферу и характер будущей кухни.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 