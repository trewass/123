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
const transporter = nodemailer.createTransporter({
  service: 'gmail', // или 'yandex', 'mail.ru'
  auth: {
    user: process.env.EMAIL_USER, // ваша почта
    pass: process.env.EMAIL_PASS  // пароль приложения
  }
})

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()
    
    // Проверяем обязательные поля
    if (!data.name || !data.phone || !data.email) {
      return NextResponse.json(
        { success: false, message: 'Не все обязательные поля заполнены' },
        { status: 400 }
      )
    }

    // Формируем HTML письмо
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          🎉 Новая заявка с сайта!
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #007bff; margin-top: 0;">📋 Информация о клиенте:</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Имя:</td>
              <td style="padding: 8px 0;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Телефон:</td>
              <td style="padding: 8px 0;">
                <a href="tel:${data.phone}" style="color: #007bff; text-decoration: none;">
                  ${data.phone}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${data.email}" style="color: #007bff; text-decoration: none;">
                  ${data.email}
                </a>
              </td>
            </tr>
            ${data.message ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Сообщение:</td>
              <td style="padding: 8px 0;">${data.message}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        
        <div style="background: #e9ecef; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #6c757d;">📊 Дополнительная информация:</h4>
          <p style="margin: 5px 0; color: #6c757d;">
            <strong>Источник:</strong> ${data.source || 'Веб-сайт'}
          </p>
          <p style="margin: 5px 0; color: #6c757d;">
            <strong>Страница:</strong> ${data.page || 'Не указана'}
          </p>
          <p style="margin: 5px 0; color: #6c757d;">
            <strong>Дата:</strong> ${new Date().toLocaleString('ru-RU')}
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
          <p style="color: #6c757d; font-size: 14px;">
            Это автоматическое уведомление с сайта технических проектов
          </p>
        </div>
      </div>
    `

    // Настройки письма
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, // куда отправлять
      subject: `🎯 Новая заявка: ${data.name} - ${data.phone}`,
      html: htmlContent,
      text: `
Новая заявка с сайта!

Имя: ${data.name}
Телефон: ${data.phone}
Email: ${data.email}
${data.message ? `Сообщение: ${data.message}` : ''}

Источник: ${data.source || 'Веб-сайт'}
Страница: ${data.page || 'Не указана'}
Дата: ${new Date().toLocaleString('ru-RU')}
      `
    }

    // Отправляем письмо
    await transporter.sendMail(mailOptions)

    return NextResponse.json({
      success: true,
      message: 'Заявка успешно отправлена!'
    })

  } catch (error) {
    console.error('Ошибка отправки заявки:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Ошибка отправки заявки. Попробуйте позже.' 
      },
      { status: 500 }
    )
  }
}
