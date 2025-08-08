import fs from 'fs'
import path from 'path'

// Типы для медиа файлов
export interface MediaFile {
  name: string
  path: string
  size?: number
  type: string
  lastModified?: Date
}

export interface ImageFile extends MediaFile {
  width?: number
  height?: number
  format: 'jpg' | 'jpeg' | 'png' | 'webp'
}

export interface VideoFile extends MediaFile {
  duration?: number
  width?: number
  height?: number
  format: 'mp4' | 'webm' | 'avi'
}

export interface DocumentFile extends MediaFile {
  pages?: number
  format: 'pdf' | 'doc' | 'docx'
}

// Поддерживаемые форматы
export const SUPPORTED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp']
export const SUPPORTED_VIDEO_FORMATS = ['mp4', 'webm', 'avi', 'mov']
export const SUPPORTED_DOCUMENT_FORMATS = ['pdf', 'doc', 'docx']

// Валидация медиа файлов
export function validateMediaFile(filename: string, allowedFormats: string[]): boolean {
  const extension = path.extname(filename).toLowerCase().slice(1)
  return allowedFormats.includes(extension)
}

export function validateImageFile(filename: string): boolean {
  return validateMediaFile(filename, SUPPORTED_IMAGE_FORMATS)
}

export function validateVideoFile(filename: string): boolean {
  return validateMediaFile(filename, SUPPORTED_VIDEO_FORMATS)
}

export function validateDocumentFile(filename: string): boolean {
  return validateMediaFile(filename, SUPPORTED_DOCUMENT_FORMATS)
}

// Получение информации о файле
export function getFileInfo(filePath: string): MediaFile | null {
  try {
    const stats = fs.statSync(filePath)
    const name = path.basename(filePath)
    const extension = path.extname(filePath).toLowerCase().slice(1)
    
    return {
      name,
      path: filePath,
      size: stats.size,
      type: getMimeType(extension),
      lastModified: stats.mtime
    }
  } catch (error) {
    console.error('Error getting file info:', error)
    return null
  }
}

// Получение MIME типа
export function getMimeType(extension: string): string {
  const mimeTypes: Record<string, string> = {
    // Изображения
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
    
    // Видео
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'avi': 'video/x-msvideo',
    'mov': 'video/quicktime',
    
    // Документы
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  }
  
  return mimeTypes[extension] || 'application/octet-stream'
}

// Получение списка изображений
export function getImageFiles(directory: string = 'public/images'): ImageFile[] {
  try {
    const files = fs.readdirSync(directory)
    const imageFiles: ImageFile[] = []
    
    for (const file of files) {
      if (validateImageFile(file)) {
        const filePath = path.join(directory, file)
        const fileInfo = getFileInfo(filePath)
        
        if (fileInfo) {
          const extension = path.extname(file).toLowerCase().slice(1) as ImageFile['format']
          imageFiles.push({
            ...fileInfo,
            format: extension
          })
        }
      }
    }
    
    return imageFiles.sort((a, b) => 
      (b.lastModified?.getTime() || 0) - (a.lastModified?.getTime() || 0)
    )
  } catch (error) {
    console.error('Error reading image files:', error)
    return []
  }
}

// Получение списка видео файлов
export function getVideoFiles(directory: string = 'public/videos'): VideoFile[] {
  try {
    const files = fs.readdirSync(directory)
    const videoFiles: VideoFile[] = []
    
    for (const file of files) {
      if (validateVideoFile(file)) {
        const filePath = path.join(directory, file)
        const fileInfo = getFileInfo(filePath)
        
        if (fileInfo) {
          const extension = path.extname(file).toLowerCase().slice(1) as VideoFile['format']
          videoFiles.push({
            ...fileInfo,
            format: extension
          })
        }
      }
    }
    
    return videoFiles.sort((a, b) => 
      (b.lastModified?.getTime() || 0) - (a.lastModified?.getTime() || 0)
    )
  } catch (error) {
    console.error('Error reading video files:', error)
    return []
  }
}

// Получение списка документов
export function getDocumentFiles(directory: string = 'public/documents'): DocumentFile[] {
  try {
    const files = fs.readdirSync(directory)
    const documentFiles: DocumentFile[] = []
    
    for (const file of files) {
      if (validateDocumentFile(file)) {
        const filePath = path.join(directory, file)
        const fileInfo = getFileInfo(filePath)
        
        if (fileInfo) {
          const extension = path.extname(file).toLowerCase().slice(1) as DocumentFile['format']
          documentFiles.push({
            ...fileInfo,
            format: extension
          })
        }
      }
    }
    
    return documentFiles.sort((a, b) => 
      (b.lastModified?.getTime() || 0) - (a.lastModified?.getTime() || 0)
    )
  } catch (error) {
    console.error('Error reading document files:', error)
    return []
  }
}

// Форматирование размера файла
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Получение относительного пути для веб-доступа
export function getWebPath(filePath: string): string {
  // Убираем 'public' из пути для веб-доступа
  return filePath.replace(/^public/, '')
}

// Проверка существования файла
export function fileExists(filePath: string): boolean {
  try {
    return fs.existsSync(filePath)
  } catch (error) {
    return false
  }
}

// Создание директории если не существует
export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
} 