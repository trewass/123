import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Типы для данных формы
interface ContactFormData {
  name: string
  phone: string
  email: string
  message: string
  source?: string
  page?: string
}

// Настройка транспорта для отправки почты
const transporter = nodemailer.createTransport({
  service: 'yandex',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// Функция для определения темы письма и источника
function getEmailInfo(page: string) {
  const pageInfo = {
    '/': {
      subject: '🏠 Заявка с главной страницы',
      source: 'Главная страница',
      description: 'Клиент оставил заявку на получение примеров техпроектов'
    },
    '/case': {
      subject: '📋 Заявка со страницы кейсов',
      source: 'Страница кейсов',
      description: 'Клиент заинтересовался реальными проектами'
    },
    '/project-demo': {
      subject: '📐 Заявка со страницы примера проекта',
      source: 'Страница примера проекта',
      description: 'Клиент хочет заказать похожий проект'
    },
    '/case/': {
      subject: '🎯 Заявка с детальной страницы кейса',
      source: 'Детальная страница кейса',
      description: 'Клиент заинтересовался конкретным проектом'
    }
  }

  // Определяем подходящую страницу
  for (const [path, info] of Object.entries(pageInfo)) {
    if (page.startsWith(path)) {
      return info
    }
  }

  // По умолчанию
  return {
    subject: '📞 Новая заявка с сайта',
    source: 'Веб-сайт',
    description: 'Клиент оставил заявку'
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()
    
    // Проверяем обязательные поля
    if (!data.name || !data.phone) {
      return NextResponse.json(
        { success: false, message: 'Не все обязательные поля заполнены' },
        { status: 400 }
      )
    }

    const emailInfo = getEmailInfo(data.page || '/')

    // Проверяем настройки почты
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Ошибка: EMAIL_USER или EMAIL_PASS не настроены')
      return NextResponse.json(
        { success: false, message: 'Ошибка настройки почты' },
        { status: 500 }
      )
    }

    // Формируем красивое HTML письмо
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background: white; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .info-block { background: #f8f9fa; border-radius: 10px; padding: 20px; margin: 20px 0; }
          .contact-info { background: #e3f2fd; border-left: 4px solid #2196f3; padding: 15px; margin: 20px 0; }
          .footer { background: #f5f5f5; padding: 20px; text-align: center; color: #666; }
          .button { display: inline-block; background: #2196f3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
          .highlight { color: #2196f3; font-weight: bold; }
          .emoji { font-size: 24px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="emoji">🎉</div>
            <h1 style="margin: 10px 0;">Новая заявка!</h1>
            <p style="margin: 0; opacity: 0.9;">${emailInfo.description}</p>
          </div>
          
          <div class="content">
            <div class="info-block">
              <h3 style="color: #333; margin-top: 0;">👤 Информация о клиенте</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Имя:</td>
                  <td style="padding: 8px 0; color: #333;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Телефон:</td>
                  <td style="padding: 8px 0;">
                    <a href="tel:${data.phone}" style="color: #2196f3; text-decoration: none; font-weight: bold;">
                      ${data.phone}
                    </a>
                  </td>
                </tr>
                ${data.email ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${data.email}" style="color: #2196f3; text-decoration: none;">
                      ${data.email}
                    </a>
                  </td>
                </tr>
                ` : ''}
                ${data.message ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Сообщение:</td>
                  <td style="padding: 8px 0; color: #333;">${data.message}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <div class="contact-info">
              <h4 style="margin-top: 0; color: #1976d2;">📊 Дополнительная информация</h4>
              <p style="margin: 5px 0; color: #333;">
                <strong>Источник:</strong> <span class="highlight">${emailInfo.source}</span>
              </p>
              <p style="margin: 5px 0; color: #333;">
                <strong>Страница:</strong> <span class="highlight">${data.page || 'Не указана'}</span>
              </p>
              <p style="margin: 5px 0; color: #333;">
                <strong>Дата:</strong> <span class="highlight">${new Date().toLocaleString('ru-RU')}</span>
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="tel:${data.phone}" class="button">📞 Позвонить клиенту</a>
              ${data.email ? `
              <a href="mailto:${data.email}" class="button" style="margin-left: 10px;">✉️ Написать email</a>
              ` : ''}
            </div>
          </div>
          
          <div class="footer">
            <p style="margin: 0; font-size: 14px;">
              Это автоматическое уведомление с сайта технических проектов
            </p>
            <p style="margin: 5px 0; font-size: 12px; opacity: 0.7;">
              Время получения: ${new Date().toLocaleString('ru-RU')}
            </p>
          </div>
        </div>
      </body>
      </html>
    `

    // Текстовая версия письма
    const textContent = `
Новая заявка с сайта!

${emailInfo.description}

ИНФОРМАЦИЯ О КЛИЕНТЕ:
Имя: ${data.name}
Телефон: ${data.phone}
${data.email ? `Email: ${data.email}` : ''}
${data.message ? `Сообщение: ${data.message}` : ''}

ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ:
Источник: ${emailInfo.source}
Страница: ${data.page || 'Не указана'}
Дата: ${new Date().toLocaleString('ru-RU')}

---
Это автоматическое уведомление с сайта технических проектов
    `

    // Настройки письма
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: emailInfo.subject,
      html: htmlContent,
      text: textContent
    }

    console.log('Отправка письма:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    })

    // Отправляем письмо
    const result = await transporter.sendMail(mailOptions)
    console.log('Письмо отправлено успешно:', result.messageId)

    return NextResponse.json({
      success: true,
      message: 'Заявка успешно отправлена!'
    })

  } catch (error) {
    console.error('Ошибка отправки заявки:', error)
    
    // Возвращаем более информативную ошибку
    let errorMessage = 'Ошибка отправки заявки. Попробуйте позже.'
    
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'EAUTH') {
        errorMessage = 'Ошибка аутентификации почты. Проверьте настройки EMAIL_USER и EMAIL_PASS.'
      } else if (error.code === 'ECONNECTION') {
        errorMessage = 'Ошибка подключения к почтовому серверу.'
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
      },
      { status: 500 }
    )
  }
}
