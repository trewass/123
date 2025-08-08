import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { validateImageFile, validateVideoFile, validateDocumentFile } from '@/lib/media'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string // 'image', 'video', 'document'

    if (!file) {
      return NextResponse.json(
        { error: 'Файл не найден' },
        { status: 400 }
      )
    }

    // Валидация типа файла
    let isValid = false
    let uploadDir = ''

    switch (type) {
      case 'image':
        isValid = validateImageFile(file.name)
        uploadDir = 'public/images'
        break
      case 'video':
        isValid = validateVideoFile(file.name)
        uploadDir = 'public/videos'
        break
      case 'document':
        isValid = validateDocumentFile(file.name)
        uploadDir = 'public/documents'
        break
      default:
        return NextResponse.json(
          { error: 'Неверный тип файла' },
          { status: 400 }
        )
    }

    if (!isValid) {
      return NextResponse.json(
        { error: 'Неподдерживаемый формат файла' },
        { status: 400 }
      )
    }

    // Проверка размера файла (максимум 50MB)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Файл слишком большой. Максимальный размер: 50MB' },
        { status: 400 }
      )
    }

    // Создание директории если не существует
    await mkdir(uploadDir, { recursive: true })

    // Генерация уникального имени файла
    const timestamp = Date.now()
    const extension = path.extname(file.name)
    const fileName = `${path.parse(file.name).name}_${timestamp}${extension}`
    const filePath = path.join(uploadDir, fileName)

    // Конвертация файла в Buffer и сохранение
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Возврат информации о загруженном файле
    return NextResponse.json({
      success: true,
      file: {
        name: fileName,
        originalName: file.name,
        path: filePath,
        size: file.size,
        type: file.type,
        webPath: `/${uploadDir.replace('public/', '')}/${fileName}`
      }
    })

  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Ошибка при загрузке файла' },
      { status: 500 }
    )
  }
}

// GET endpoint для получения списка файлов
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'image', 'video', 'document'

    if (!type) {
      return NextResponse.json(
        { error: 'Тип файлов не указан' },
        { status: 400 }
      )
    }

    // Здесь можно добавить логику для получения списка файлов
    // Пока возвращаем пустой массив
    return NextResponse.json({
      files: []
    })

  } catch (error) {
    console.error('Error getting files:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении списка файлов' },
      { status: 500 }
    )
  }
} 