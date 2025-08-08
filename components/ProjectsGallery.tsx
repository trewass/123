'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Play } from 'lucide-react'
import Link from 'next/link'

interface Project {
  id: string
  title: string
  location: string
  year: string
  type: string
  description: string
  thumbnail: string
  imageCount: number
  videoCount: number
}

interface ProjectsGalleryProps {
  projects: Project[]
}

export default function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Link href={`/project/${project.id}`} className="block">
            <div className="bg-background-surface/50 border border-neutral-800 rounded-2xl p-4 sm:p-6 backdrop-blur-sm hover:bg-background-surface/70 transition-all duration-300 group">
              <div className="space-y-4">
                {/* Превью проекта */}
                <div className="aspect-square bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-xl overflow-hidden relative group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-orange-500/30 flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                        <span className="text-white text-2xl sm:text-3xl">🏠</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm sm:text-base text-white font-medium">
                          {project.title}
                        </p>
                        <p className="text-xs sm:text-sm text-white/80">
                          {project.type}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Иконка внешней ссылки */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-accent-500/20 border border-accent-500/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <ExternalLink className="w-4 h-4 text-accent-400" />
                  </div>
                </div>

                {/* Информация о проекте */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium text-neutral-200 group-hover:text-accent-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-400">
                      {project.location}, {project.year}
                    </p>
                  </div>
                  
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Статистика */}
                  <div className="flex items-center justify-between text-xs sm:text-sm text-neutral-400">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <span>📷</span>
                        <span>{project.imageCount}</span>
                      </span>
                      {project.videoCount > 0 && (
                        <span className="flex items-center space-x-1">
                          <Play className="w-3 h-3" />
                          <span>{project.videoCount}</span>
                        </span>
                      )}
                    </div>
                    <span className="text-accent-400 font-medium">
                      Подробнее
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
