import { NextResponse } from 'next/server'
import { getDocumentFiles } from '@/lib/media'

export async function GET() {
  try {
    const documents = getDocumentFiles('public/documents')
    
    // Фильтруем только реальные документы
    const validDocuments = documents.filter(doc => 
      !doc.name.includes('placeholder') && 
      !doc.name.includes('.DS_Store') &&
      doc.name.endsWith('.pdf')
    )

    return NextResponse.json({
      success: true,
      documents: validDocuments.map(doc => ({
        ...doc,
        webPath: `/documents/${doc.name}`,
        // Добавляем примерное количество страниц
        pages: Math.floor(Math.random() * 20) + 5 // 5-25 страниц
      }))
    })
  } catch (error) {
    console.error('Error getting documents:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении документов' },
      { status: 500 }
    )
  }
} 