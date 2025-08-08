'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, CheckCircle, AlertTriangle, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const realCases = [
  {
    id: 'kitchen-moscow-family',
    title: 'Кухня для семьи из 4 человек',
    subtitle: 'Москва, ЖК "Парк Легенд"',
    location: 'Москва',
    year: '2024',
    area: '12 м²',
    style: 'Современный',
    problem: {
      title: 'Проблема клиента',
      description: 'Семья из 4 человек жила в квартире с кухней 12 м². Основные проблемы: не хватало места для хранения, техника не помещалась, розеток было мало, а вытяжка не работала эффективно.',
      issues: [
        'Не хватало места для хранения продуктов и посуды',
        'Посудомоечная машина не помещалась',
        'Всего 3 розетки на всю кухню',
        'Вытяжка не справлялась с запахами',
        'Не было места для кофемашины'
      ]
    },
    solution: {
      title: 'Наше решение',
      description: 'Создали детальный план с учетом всех потребностей семьи. Продумали каждую розетку, вытяжку и место для техники.',
      features: [
        'Схема электрики с 8 розетками в нужных местах',
        'План вентиляции с выводом через потолок',
        'Схема сантехники для ПММ и фильтра',
        '3D визуализация с точными размерами',
        'План освещения с LED-лентой'
      ]
    },
    result: {
      title: 'Результат',
      description: 'Кухня получилась функциональной и красивой. Все техника поместилась, места для хранения хватает, а готовить стало удобно.',
      achievements: [
        'Вместилось 4 шкафа для хранения',
        'ПММ поместилась идеально',
        'Кофемашина нашла свое место',
        'Вытяжка работает бесшумно',
        'Клиент доволен на 100%'
      ],
      testimonial: {
        text: '"Теперь готовить одно удовольствие! Все под рукой, техника работает отлично, а кухня выглядит современно и стильно."',
        author: 'Анна и Дмитрий, семья из 4 человек'
      }
    },
    images: [
      { id: 1, type: 'image', alt: 'План розеток' },
      { id: 2, type: 'image', alt: '3D визуализация' },
      { id: 3, type: 'image', alt: 'Результат до/после' },
      { id: 4, type: 'video', alt: 'Обзор готовой кухни' },
      { id: 5, type: 'image', alt: 'Детали мебели' },
      { id: 6, type: 'image', alt: 'Система хранения' }
    ]
  },
  {
    id: 'bathroom-luxury-sochi',
    title: 'Ванная комната премиум класса',
    subtitle: 'Сочи, частный дом',
    location: 'Сочи',
    year: '2024',
    area: '8 м²',
    style: 'Люкс',
    problem: {
      title: 'Проблема клиента',
      description: 'Владелец частного дома в Сочи хотел создать роскошную ванную комнату, но не знал, как правильно спланировать сантехнику и освещение.',
      issues: [
        'Не было плана размещения сантехники',
        'Освещение не подходило для макияжа',
        'Не было места для хранения косметики',
        'Душевая кабина не помещалась',
        'Не было системы вентиляции'
      ]
    },
    solution: {
      title: 'Наше решение',
      description: 'Разработали премиальный проект с использованием элитных материалов и современного оборудования.',
      features: [
        'План сантехники с точными размерами',
        'Схема освещения с подсветкой зеркал',
        'План вентиляции и отопления',
        '3D визуализация с материалами',
        'Спецификация премиальной сантехники'
      ]
    },
    result: {
      title: 'Результат',
      description: 'Получилась роскошная ванная комната, которая превзошла все ожидания клиента.',
      achievements: [
        'Вместилась душевая кабина 1.2х1.2м',
        'Установили двойную раковину',
        'Создали систему хранения косметики',
        'Освещение идеально для макияжа',
        'Клиент в восторге от результата'
      ],
      testimonial: {
        text: '"Ванная получилась просто потрясающая! Каждый день получаю удовольствие от использования. Все продумано до мелочей."',
        author: 'Елена, владелица частного дома'
      }
    },
    images: [
      { id: 1, type: 'image', alt: 'План сантехники' },
      { id: 2, type: 'image', alt: '3D визуализация' },
      { id: 3, type: 'image', alt: 'Результат до/после' },
      { id: 4, type: 'video', alt: 'Обзор ванной' },
      { id: 5, type: 'image', alt: 'Детали отделки' },
      { id: 6, type: 'image', alt: 'Система хранения' }
    ]
  },
  {
    id: 'bedroom-minimal-ekb',
    title: 'Спальня в стиле минимализм',
    subtitle: 'Екатеринбург, новостройка',
    location: 'Екатеринбург',
    year: '2024',
    area: '16 м²',
    style: 'Минимализм',
    problem: {
      title: 'Проблема клиента',
      description: 'Молодая пара хотела создать уютную спальню в стиле минимализм, но не знала, как правильно организовать пространство.',
      issues: [
        'Не было места для гардеробной',
        'Освещение не создавало уюта',
        'Не было места для телевизора',
        'Не знали, где разместить кровать',
        'Не было системы хранения'
      ]
    },
    solution: {
      title: 'Наше решение',
      description: 'Создали функциональный план с акцентом на спокойную атмосферу и удобство использования.',
      features: [
        'План размещения мебели',
        'Схема скрытого освещения',
        'План гардеробной системы',
        '3D визуализация интерьера',
        'Спецификация мебели'
      ]
    },
    result: {
      title: 'Результат',
      description: 'Получилась уютная и функциональная спальня, где приятно отдыхать и хранить вещи.',
      achievements: [
        'Вместилась гардеробная 2.5м',
        'Создали уютное освещение',
        'Нашли место для телевизора',
        'Система хранения решает все задачи',
        'Клиенты довольны атмосферой'
      ],
      testimonial: {
        text: '"Спальня получилась именно такой, как мы хотели - уютной и функциональной. Теперь здесь приятно проводить время."',
        author: 'Александр и Мария, молодая пара'
      }
    },
    images: [
      { id: 1, type: 'image', alt: 'План размещения' },
      { id: 2, type: 'image', alt: '3D визуализация' },
      { id: 3, type: 'image', alt: 'Результат до/после' },
      { id: 4, type: 'video', alt: 'Обзор спальни' },
      { id: 5, type: 'image', alt: 'Гардеробная' },
      { id: 6, type: 'image', alt: 'Освещение' }
    ]
  },
  {
    id: 'kids-room-kazan',
    title: 'Детская комната с игровой зоной',
    subtitle: 'Казань, 3-комнатная квартира',
    location: 'Казань',
    year: '2024',
    area: '14 м²',
    style: 'Детский',
    problem: {
      title: 'Проблема клиента',
      description: 'Родители хотели создать безопасную и функциональную детскую для 6-летнего ребенка, но не знали, как совместить игровую зону и спальное место.',
      issues: [
        'Не было места для игровой зоны',
        'Мебель не была безопасной',
        'Не было системы хранения игрушек',
        'Освещение не подходило для ребенка',
        'Не было места для творчества'
      ]
    },
    solution: {
      title: 'Наше решение',
      description: 'Разработали безопасный и функциональный проект с учетом всех потребностей ребенка.',
      features: [
        'План безопасной мебели',
        'Схема игровой зоны',
        'План системы хранения',
        '3D визуализация интерьера',
        'Спецификация экологичных материалов'
      ]
    },
    result: {
      title: 'Результат',
      description: 'Получилась идеальная детская комната, где ребенок может играть, учиться и отдыхать.',
      achievements: [
        'Создали безопасную игровую зону',
        'Вместилась система хранения игрушек',
        'Нашли место для творчества',
        'Освещение подходит для ребенка',
        'Родители и ребенок довольны'
      ],
      testimonial: {
        text: '"Дочка в восторге от своей комнаты! Теперь у неё есть место и для игр, и для учебы. Все безопасно и красиво."',
        author: 'Ольга, мама 6-летней дочки'
      }
    },
    images: [
      { id: 1, type: 'image', alt: 'План размещения' },
      { id: 2, type: 'image', alt: '3D визуализация' },
      { id: 3, type: 'image', alt: 'Результат до/после' },
      { id: 4, type: 'video', alt: 'Обзор детской' },
      { id: 5, type: 'image', alt: 'Игровая зона' },
      { id: 6, type: 'image', alt: 'Система хранения' }
    ]
  },
  {
    id: 'office-novosibirsk',
    title: 'Рабочий кабинет для предпринимателя',
    subtitle: 'Новосибирск, частный дом',
    location: 'Новосибирск',
    year: '2024',
    area: '20 м²',
    style: 'Профессиональный',
    problem: {
      title: 'Проблема клиента',
      description: 'Предприниматель хотел создать профессиональный рабочий кабинет для продуктивной работы, но не знал, как правильно организовать пространство.',
      issues: [
        'Не было эргономичного рабочего места',
        'Освещение не подходило для работы',
        'Не было места для встреч',
        'Не было системы хранения документов',
        'Не было технологической зоны'
      ]
    },
    solution: {
      title: 'Наше решение',
      description: 'Разработали профессиональный проект с акцентом на продуктивность и комфорт.',
      features: [
        'План эргономичного рабочего места',
        'Схема профессионального освещения',
        'План зоны для встреч',
        '3D визуализация интерьера',
        'Спецификация офисной мебели'
      ]
    },
    result: {
      title: 'Результат',
      description: 'Получился профессиональный кабинет, где приятно и продуктивно работать.',
      achievements: [
        'Создали эргономичное рабочее место',
        'Вместилась зона для встреч',
        'Система хранения решает все задачи',
        'Освещение идеально для работы',
        'Клиент доволен продуктивностью'
      ],
      testimonial: {
        text: '"Кабинет получился именно таким, как я хотел - функциональным и стильным. Теперь работаю с удовольствием!"',
        author: 'Дмитрий, предприниматель'
      }
    },
    images: [
      { id: 1, type: 'image', alt: 'План размещения' },
      { id: 2, type: 'image', alt: '3D визуализация' },
      { id: 3, type: 'image', alt: 'Результат до/после' },
      { id: 4, type: 'video', alt: 'Обзор кабинета' },
      { id: 5, type: 'image', alt: 'Рабочая зона' },
      { id: 6, type: 'image', alt: 'Зона встреч' }
    ]
  }
]

export default function ExamplesSection() {
  return (
    <section id="examples" className="py-12 sm:py-16 lg:py-20 bg-background-secondary">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-200 mb-4 sm:mb-6">
            Реальные кейсы
          </h2>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-3xl mx-auto">
            Посмотрите, как мы решаем реальные проблемы клиентов и создаем функциональные пространства
          </p>
        </motion.div>

        {/* Сетка кейсов */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {realCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/case/${caseItem.id}`} className="block">
                <div className="bg-background-surface/30 border border-neutral-800 rounded-2xl p-4 sm:p-6 backdrop-blur-sm hover:bg-background-surface/50 transition-all duration-300 hover:scale-105 group-hover:border-accent-500/30">
                  {/* Изображение кейса */}
                  <div className="relative aspect-video mb-4 sm:mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-accent-500/20 to-accent-600/20">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-orange-500/30 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 border border-white/30 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-white text-2xl sm:text-3xl">🏠</span>
                        </div>
                        <p className="text-sm text-white/80">Превью кейса</p>
                      </div>
                    </div>
                    
                    {/* Иконка внешней ссылки */}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Информация о кейсе */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium text-neutral-200 mb-1 group-hover:text-accent-400 transition-colors">
                        {caseItem.title}
                      </h3>
                      <p className="text-sm sm:text-base text-neutral-400 mb-3">
                        {caseItem.subtitle}
                      </p>
                    </div>

                    {/* Метаданные кейса */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-accent-500/20 border border-accent-500/30 rounded-full text-xs text-accent-400">
                        {caseItem.area}
                      </span>
                      <span className="px-3 py-1 bg-neutral-800/50 border border-neutral-700 rounded-full text-xs text-neutral-300">
                        {caseItem.style}
                      </span>
                      <span className="px-3 py-1 bg-neutral-800/50 border border-neutral-700 rounded-full text-xs text-neutral-300">
                        {caseItem.location}
                      </span>
                    </div>

                    {/* Краткое описание проблемы */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-medium text-neutral-300">Проблема</span>
                      </div>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {caseItem.problem.description}
                      </p>
                    </div>

                    {/* Краткое описание решения */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium text-neutral-300">Решение</span>
                      </div>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {caseItem.solution.description}
                      </p>
                    </div>

                    {/* Результат */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium text-neutral-300">Результат</span>
                      </div>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {caseItem.result.description}
                      </p>
                    </div>

                    {/* Кнопка просмотра */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-neutral-500">
                        {caseItem.year}
                      </span>
                      <div className="flex items-center space-x-1 text-accent-400 group-hover:text-accent-300 transition-colors">
                        <span className="text-sm font-medium">Смотреть кейс</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA секция */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="bg-background-surface/30 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="text-xl sm:text-2xl font-medium text-neutral-200 mb-4">
              Нужен похожий проект?
            </h3>
            <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
              Создадим индивидуальный проект с учетом всех ваших пожеланий и особенностей помещения.
            </p>
            <button 
              onClick={() => {
                const contactModal = document.getElementById('contact-modal')
                if (contactModal) {
                  contactModal.style.display = 'flex'
                }
              }}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Заказать проект</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 