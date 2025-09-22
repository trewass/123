'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Download, Eye, FileText, Star, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

type DocumentSection =
  | { type: 'text'; title: string; content: string }
  | { type: 'list'; title: string; items: string[] }
  | { type: 'code'; title: string; code: string }

interface DocumentFile {
  id: string
  name: string
  description: string
  category: string
  size: string
  pages: number
  lastUpdated: string
  downloads: number
  rating: number
  icon: string
  features: string[]
  requirements: string[]
  sections?: DocumentSection[]
}

export default function DocumentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDocument, setSelectedDocument] = useState<DocumentFile | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const documents: DocumentFile[] = [
    {
      id: 'kilocode-fear-cards-prompt',
      name: 'PROMPT для KiloCode — «Fear Cards (CBT)»',
      description:
        'Полный системный и пользовательский промпт для генерации приложения карточек страхов с чек-листами, прогрессом и цветовой индикацией по уровню страха.',
      category: 'ai',
      size: 'Текст',
      pages: 12,
      lastUpdated: '18.02.2025',
      downloads: 428,
      rating: 5,
      icon: '🤖',
      features: [
        'Обновлённый сценарий КПТ-терапевта с оценкой страха 0–10',
        'Интеграция Whisper и GPT-5 с JSON-валидацией через Zod',
        'Полная логика прогресса чек-листа и цветовых статусов карточки',
        'Детализированные требования к UI Expo React Native приложения'
      ],
      requirements: [
        'Expo (React Native, TypeScript, Expo Router)',
        'OpenAI API Key, сохраняемый через Expo SecureStore',
        'Локальное хранилище SQLite (expo-sqlite) и Zustand'
      ],
      sections: [
        {
          type: 'text',
          title: 'Роль и цель',
          content:
            'Ты выступаешь как старший разработчик и архитектор. Нужно собрать мобильное приложение «Карточки страхов»: пользователь диктует ситуацию, получает транскрибацию и анализ, чек-лист шагов и поддержку, а на главном экране отображаются ключевые показатели карточки.'
        },
        {
          type: 'list',
          title: 'Технический стек',
          items: [
            'Expo + React Native + TypeScript + Expo Router',
            'UI на React Native Paper с сеткой карточек в две колонки',
            'Состояние через Zustand и локальное хранилище SQLite (expo-sqlite)',
            'Аудиозапись через expo-av и файлы в expo-file-system',
            'Безопасность ключей через Expo SecureStore и EAS Secrets',
            'OpenAI Whisper для транскрибации и GPT-5 для анализа (response_format: json_object)'
          ]
        },
        {
          type: 'code',
          title: 'Системный промпт',
          code: `Ты — цифровой терапевт на принципах когнитивно-поведенческой терапии (КПТ).
Отвечай дружелюбно, по-человечески и конкретно, без морали и диагнозов.
Всегда возвращай строго валидный JSON по заданной схеме.
Задача: на основе краткого описания страховой ситуации:
1) дать summary (2–3 предложения),
2) определить категорию,
3) выделить когнитивные искажения,
4) оценить интенсивность страха по шкале 0–10 (целое число),
5) выдать краткое описание (<= 80 символов) для карточки,
6) предложить 4–7 микро-шагов (чек-лист) на сегодня/ближайшие дни,
7) предложить 2–4 альтернативные мысли (reframes),
8) сформулировать поддерживающее сообщение в тоне «по-дружески, но уважительно».
Если ситуация указывает на риски самоповреждения/агрессии — выставь safety.flag=true и порекомендуй обратиться к специалисту.`
        },
        {
          type: 'code',
          title: 'JSON-схема ответа',
          code: `{
  "summary": "string",
  "category": "social_anxiety | performance_anxiety | health_anxiety | financial_fear | fear_of_rejection | fear_of_failure | general_anxiety",
  "distortions": ["catastrophizing", "mind_reading", "fortune_telling", "overgeneralization", "all_or_nothing", "personalization", "should_statements", "emotional_reasoning", "labeling"],
  "severity_0_10": 0,
  "short_description": "string",
  "checklist": [
    { "title": "string", "instructions": "string", "expected_minutes": 10, "difficulty_1_3": 1 }
  ],
  "reframes": ["string", "string"],
  "supportive_message": "string",
  "safety": { "flag": false, "note": "string" }
}`
        },
        {
          type: 'code',
          title: 'Пользовательский промпт',
          code: `Текст ситуации (RU):
"""
{TRANSCRIPT_OR_TEXT}
"""

Верни строго JSON по схеме выше.
"short_description" сделай до 80 символов, по существу (например: "Увижу знакомых — придётся разговаривать").
"checklist": 4–7 очень маленьких шагов (10–30 минут, низкая сложность), первый шаг — самый простой.
"severity_0_10": целое число, 0=нет страха, 10=максимальный.
Тон поддержки: тёплый, уважительный, по-дружески.`
        },
        {
          type: 'text',
          title: 'Логика прогресса и цвета',
          content:
            'Прогресс карточки рассчитывается как округлённое значение (completedSteps / totalSteps) * 100. Цвет карточки на главном экране зависит от текущего severity: 0–3 — зелёный, 4–6 — янтарный, 7–10 — красный. На карточке отображаются название, краткое описание, бейдж Severity N/10, ProgressBar и подпись X / Y шагов.'
        },
        {
          type: 'list',
          title: 'Главный экран карточек',
          items: [
            'Две колонки карточек среднего размера с Paper Card и скруглением 2xl',
            'Верхняя часть карточки: название, short_description и чип с Severity',
            'Цвет чипа и карточки соответствует уровню страха',
            'ProgressBar по ширине карточки + подпись X / Y шагов и дата последнего обновления',
            'Тап по карточке открывает экран деталей'
          ]
        },
        {
          type: 'list',
          title: 'Экран «Создать карточку»',
          items: [
            'Обязательное поле названия, опциональные теги и краткое описание',
            'Блок записи аудио: Записать, Остановить, Прослушать, Отправить на транскрибацию',
            'После транскрибации показывать текст и кнопку запуска анализа ИИ',
            'Результат анализа заполняет severity, категорию, искажения, short_description, чек-лист, summary, reframes и поддержку'
          ]
        },
        {
          type: 'code',
          title: 'Типы данных и прогресс',
          code: `type Card = {
  id: string
  title: string
  shortDescription: string
  severity: number
  checklist: Step[]
  progressCached: number
}

type Step = {
  id: string
  title: string
  instructions?: string
  expected_minutes: number
  difficulty_1_3: number
  doneDates: string[]
}`
        },
        {
          type: 'list',
          title: 'Работа с API-ключом и безопасностью',
          items: [
            'Экран «Настройки» с полем ввода ключа и сохранением через SecureStore',
            'При отсутствии ключа кнопки ИИ недоступны и отображается тост с подсказкой',
            'В продакшене ключи передаются через EAS Secrets, хардкода быть не должно'
          ]
        },
        {
          type: 'list',
          title: 'MVP задачи',
          items: [
            'Стартовый проект Expo с настройками Router, Paper, Zustand и SQLite',
            'Главный экран карточек с моками, цветами и прогрессом',
            'Экран создания карточки с записью аудио и отправкой на Whisper',
            'Интеграция GPT-5 с response_format: json_object и строгим парсингом (zod)',
            'Экран деталей с summary, категориями, искажениями, чек-листом, рефреймами и поддержкой',
            'Пересчёт прогресса с мгновенным обновлением карточек',
            'Экран «Настройки» для ввода и сохранения API-ключа'
          ]
        },
        {
          type: 'list',
          title: 'Критерии приёмки',
          items: [
            'Карточка на главном экране показывает название, short_description, цвет, прогресс и счётчик шагов',
            'Цвет автоматически меняется при обновлении severity',
            'Прогресс обновляется сразу после отметки чек-листа',
            'Ответы ИИ обязаны быть валидным JSON, ошибки сопровождаются тостом и опцией повторить',
            'API-ключ нигде не хардкодится'
          ]
        }
      ]
    },
    {
      id: 'tech-conditions-2024',
      name: 'Технические условия 2024',
      description: 'Актуальные технические условия для всех типов проектов мебели и интерьера',
      category: 'technical',
      size: '2.4 MB',
      pages: 45,
      lastUpdated: '15.01.2024',
      downloads: 1247,
      rating: 4.8,
      icon: '📋',
      features: [
        'Современные стандарты качества',
        'Требования к материалам',
        'Технические характеристики',
        'Нормы безопасности'
      ],
      requirements: [
        'Adobe Reader или аналогичная программа',
        'Интернет-соединение для загрузки'
      ]
    },
    {
      id: 'quality-standards-premium',
      name: 'Стандарты качества Премиум',
      description: 'Высокие стандарты качества для премиальной мебели и интерьеров',
      category: 'quality',
      size: '3.1 MB',
      pages: 67,
      lastUpdated: '20.01.2024',
      downloads: 892,
      rating: 4.9,
      icon: '⭐',
      features: [
        'Премиальные материалы',
        'Высокие стандарты отделки',
        'Гарантийные обязательства',
        'Контроль качества'
      ],
      requirements: [
        'Adobe Reader или аналогичная программа',
        'Интернет-соединение для загрузки'
      ]
    },
    {
      id: 'installation-guide-complete',
      name: 'Полное руководство по монтажу',
      description: 'Пошаговые инструкции по установке и монтажу всех типов мебели',
      category: 'installation',
      size: '4.2 MB',
      pages: 89,
      lastUpdated: '25.01.2024',
      downloads: 1563,
      rating: 4.7,
      icon: '🔧',
      features: [
        'Пошаговые инструкции',
        'Фото и схемы',
        'Список инструментов',
        'Меры безопасности'
      ],
      requirements: [
        'Adobe Reader или аналогичная программа',
        'Интернет-соединение для загрузки'
      ]
    },
    {
      id: 'safety-regulations',
      name: 'Правила безопасности',
      description: 'Основные правила безопасности при работе с мебелью и материалами',
      category: 'safety',
      size: '1.8 MB',
      pages: 32,
      lastUpdated: '10.01.2024',
      downloads: 2341,
      rating: 4.6,
      icon: '🛡️',
      features: [
        'Правила безопасности',
        'Средства защиты',
        'Экстренные ситуации',
        'Первая помощь'
      ],
      requirements: [
        'Adobe Reader или аналогичная программа',
        'Интернет-соединение для загрузки'
      ]
    },
    {
      id: 'material-guide-2024',
      name: 'Справочник материалов 2024',
      description: 'Полный каталог материалов с характеристиками и рекомендациями',
      category: 'materials',
      size: '5.6 MB',
      pages: 156,
      lastUpdated: '30.01.2024',
      downloads: 987,
      rating: 4.8,
      icon: '📚',
      features: [
        'Каталог материалов',
        'Технические характеристики',
        'Рекомендации по выбору',
        'Сравнительные таблицы'
      ],
      requirements: [
        'Adobe Reader или аналогичная программа',
        'Интернет-соединение для загрузки'
      ]
    },
    {
      id: 'warranty-terms',
      name: 'Условия гарантии',
      description: 'Подробные условия гарантийного обслуживания и ремонта',
      category: 'warranty',
      size: '1.5 MB',
      pages: 28,
      lastUpdated: '05.01.2024',
      downloads: 1123,
      rating: 4.5,
      icon: '📄',
      features: [
        'Гарантийные обязательства',
        'Условия ремонта',
        'Сроки обслуживания',
        'Контакты поддержки'
      ],
      requirements: [
        'Adobe Reader или аналогичная программа',
        'Интернет-соединение для загрузки'
      ]
    }
  ]

  const categories = [
    { id: 'all', name: 'Все документы', icon: '📁' },
    { id: 'ai', name: 'AI & Автоматизация', icon: '🤖' },
    { id: 'technical', name: 'Технические', icon: '📋' },
    { id: 'quality', name: 'Качество', icon: '⭐' },
    { id: 'installation', name: 'Монтаж', icon: '🔧' },
    { id: 'safety', name: 'Безопасность', icon: '🛡️' },
    { id: 'materials', name: 'Материалы', icon: '📚' },
    { id: 'warranty', name: 'Гарантия', icon: '📄' }
  ]

  const filteredDocuments = selectedCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory)

  const handleDocumentClick = (doc: DocumentFile) => {
    setSelectedDocument(doc)
    setIsModalOpen(true)
  }

  const handleDownload = (doc: DocumentFile) => {
    // Здесь будет логика скачивания
    console.log(`Скачивание документа: ${doc.name}`)
  }

  const handlePreview = (doc: DocumentFile) => {
    // Здесь будет логика предварительного просмотра
    console.log(`Просмотр документа: ${doc.name}`)
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-background-primary via-background-secondary to-background-primary" />
      
      {/* Декоративные элементы */}
      <div className="absolute top-20 right-4 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-4 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 bg-accent-600/5 rounded-full blur-3xl" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Навигация */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-neutral-400 hover:text-accent-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Вернуться на главную</span>
          </Link>
        </motion.div>

        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4">
            <span className="gradient-text">Техническая документация</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-3xl mx-auto">
            Полный комплект технической документации для вашего проекта. 
            Скачивайте актуальные документы и руководства.
          </p>
        </motion.div>

        {/* Фильтры по категориям */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/25'
                    : 'bg-background-surface/30 text-neutral-300 hover:bg-background-surface/50 border border-neutral-800'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Сетка документов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-background-surface/30 border border-neutral-800 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group hover:border-accent-500/50 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-500/10 rounded-full blur-2xl group-hover:bg-accent-500/20 transition-all duration-300" />
              <div className="relative z-10">
                {/* Заголовок документа */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-accent-500/20 border border-accent-500/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{doc.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-neutral-200 mb-1 group-hover:text-accent-400 transition-colors">
                      {doc.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-neutral-400">
                      <span>{doc.size}</span>
                      <span>{doc.pages} стр.</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{doc.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Описание */}
                <p className="text-sm text-neutral-300 mb-4 leading-relaxed">
                  {doc.description}
                </p>

                {/* Метаданные */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>Обновлено: {doc.lastUpdated}</span>
                    <span>{doc.downloads} скачиваний</span>
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleDocumentClick(doc)}
                    className="text-sm text-accent-400 hover:text-accent-300 transition-colors font-medium"
                  >
                    Подробнее
                  </button>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handlePreview(doc)}
                      className="p-2 text-neutral-400 hover:text-accent-400 transition-colors bg-neutral-800/50 rounded-lg hover:bg-neutral-800"
                      title="Предварительный просмотр"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDownload(doc)}
                      className="p-2 text-neutral-400 hover:text-accent-400 transition-colors bg-neutral-800/50 rounded-lg hover:bg-neutral-800"
                      title="Скачать документ"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Информационный блок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-background-surface/30 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm"
        >
          <div className="text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-medium text-neutral-200">
              Техническая поддержка
            </h3>
            <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto">
              Все документы соответствуют действующим стандартам и нормам. 
              При возникновении вопросов обращайтесь к нашим специалистам.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button className="btn-secondary text-sm sm:text-base">
                Получить консультацию
              </button>
              <button className="btn-primary text-sm sm:text-base">
                Заказать звонок
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Модальное окно с подробной информацией о документе */}
      <AnimatePresence>
        {isModalOpen && selectedDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-2xl w-full max-h-[90vh] bg-background-surface/90 border border-neutral-800 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Кнопка закрытия */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <span className="text-white text-lg">×</span>
              </button>

              {/* Содержимое модального окна */}
              <div className="p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-accent-500/20 border border-accent-500/30 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">{selectedDocument.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-medium text-neutral-200 mb-2">
                      {selectedDocument.name}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-neutral-400">
                      <span>{selectedDocument.size}</span>
                      <span>{selectedDocument.pages} страниц</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{selectedDocument.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-neutral-300 mb-6 leading-relaxed">
                  {selectedDocument.description}
                </p>

                {selectedDocument.sections && selectedDocument.sections.length > 0 && (
                  <div className="space-y-6 mb-8">
                    {selectedDocument.sections.map((section, index) => {
                      if (section.type === 'text') {
                        return (
                          <div key={index} className="space-y-3">
                            <h3 className="text-lg font-medium text-neutral-200">{section.title}</h3>
                            <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">{section.content}</p>
                          </div>
                        )
                      }
                      if (section.type === 'list') {
                        return (
                          <div key={index} className="space-y-3">
                            <h3 className="text-lg font-medium text-neutral-200">{section.title}</h3>
                            <ul className="space-y-2 list-disc list-inside text-sm text-neutral-300">
                              {section.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="leading-relaxed">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      }
                      if (section.type === 'code') {
                        return (
                          <div key={index} className="space-y-3">
                            <h3 className="text-lg font-medium text-neutral-200">{section.title}</h3>
                            <pre className="text-sm text-neutral-200 bg-black/40 border border-neutral-700 rounded-xl p-4 overflow-x-auto whitespace-pre-wrap">
                              {section.code}
                            </pre>
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                )}

                {/* Основные возможности */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-neutral-200 mb-3 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Основные возможности</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedDocument.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-neutral-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Системные требования */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-neutral-200 mb-3 flex items-center space-x-2">
                    <Info className="w-5 h-5 text-blue-400" />
                    <span>Системные требования</span>
                  </h3>
                  <div className="space-y-2">
                    {selectedDocument.requirements.map((req, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-neutral-300">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button 
                    onClick={() => handleDownload(selectedDocument)}
                    className="btn-primary flex-1 flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Скачать документ</span>
                  </button>
                  <button 
                    onClick={() => handlePreview(selectedDocument)}
                    className="btn-secondary flex-1 flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Предварительный просмотр</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
