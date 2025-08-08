'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Eye } from 'lucide-react'

interface DocumentFile {
  name: string
  path: string
  size?: number
  type: string
  webPath: string
  pages?: number
}

export default function DocumentsSection() {
  const [documents, setDocuments] = useState<DocumentFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Загрузка технической документации
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true)
        // Здесь можно добавить API для технической документации
        // Пока используем заглушку
        setDocuments([
          {
            name: 'Технические условия',
            path: '/documents/tech-conditions.pdf',
            size: 1024 * 1024, // 1MB
            type: 'application/pdf',
            webPath: '/documents/tech-conditions.pdf',
            pages: 15
          },
          {
            name: 'Стандарты качества',
            path: '/documents/quality-standards.pdf',
            size: 2 * 1024 * 1024, // 2MB
            type: 'application/pdf',
            webPath: '/documents/quality-standards.pdf',
            pages: 25
          },
          {
            name: 'Монтажные инструкции',
            path: '/documents/installation-guide.pdf',
            size: 1.5 * 1024 * 1024, // 1.5MB
            type: 'application/pdf',
            webPath: '/documents/installation-guide.pdf',
            pages: 20
          }
        ])
      } catch (err) {
        setError('Ошибка загрузки документов')
        console.error('Error fetching documents:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  const handleDownload = (doc: DocumentFile) => {
    const link = document.createElement('a')
    link.href = doc.webPath
    link.download = doc.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePreview = (doc: DocumentFile) => {
    window.open(doc.webPath, '_blank')
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-medium text-white mb-2">
          Техническая документация
        </h2>
        <p className="text-neutral-300">
          Скачайте технические условия, стандарты качества и монтажные инструкции
        </p>
      </div>

      {/* Состояние загрузки */}
      {loading && (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-300">Загрузка документов...</p>
        </div>
      )}

      {/* Состояние ошибки */}
      {error && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <p className="text-red-400 mb-2">Ошибка загрузки</p>
          <p className="text-neutral-400 text-sm">{error}</p>
        </div>
      )}

      {/* Сетка документов */}
      {!loading && !error && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card group hover:border-accent-500/50 transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent-500/20 border border-accent-500/30 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-accent-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate">{doc.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-neutral-400">
                    <span>PDF</span>
                    {doc.size && (
                      <span>{(doc.size / 1024 / 1024).toFixed(1)} MB</span>
                    )}
                    {doc.pages && (
                      <span>{doc.pages} стр.</span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => handlePreview(doc)}
                    className="p-1 text-neutral-400 hover:text-accent-400 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDownload(doc)}
                    className="p-1 text-neutral-400 hover:text-accent-400 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Информационный блок */}
      {!loading && !error && documents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-background-surface/50 border border-neutral-800 rounded-xl p-6"
        >
          <div className="text-center space-y-4">
            <h3 className="text-xl font-medium text-white">Техническая поддержка</h3>
            <p className="text-neutral-300 text-sm">
              Все документы соответствуют действующим стандартам и нормам. 
              При возникновении вопросов обращайтесь к нашим специалистам.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="btn-secondary text-sm">
                Получить консультацию
              </button>
              <button className="btn-primary text-sm">
                Заказать звонок
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
} 