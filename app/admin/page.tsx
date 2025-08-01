'use client'

import { useState, useEffect } from 'react'

interface AirtableRecord {
  id: string
  fields: Record<string, any>
}

export default function AdminPanel() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [projects, setProjects] = useState<AirtableRecord[]>([])
  const [stories, setStories] = useState<AirtableRecord[]>([])
  const [blogPosts, setBlogPosts] = useState<AirtableRecord[]>([])
  const [leads, setLeads] = useState<AirtableRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const airtableBase = 'appayVD9m1J1bR13Z'
  const airtableToken = 'patQfujQaKiRKW0ix.9968ac4d5d84d30dc7f7ac663c993282324a6cfb07125313b2c58268f943b4ee'

  // Тестовые данные для демонстрации
  const mockData = {
    projects: [
      { id: '1', fields: { Name: 'Современная кухня в Ялте', Type: 'Кухня', City: 'Ялта', Status: 'Опубликован' } },
      { id: '2', fields: { Name: 'Гардеробная в доме', Type: 'Гардероб', City: 'Краснодар', Status: 'Черновик' } },
      { id: '3', fields: { Name: 'Ванная комната в коттедже', Type: 'Ванная', City: 'Феодосия', Status: 'Опубликован' } }
    ],
    stories: [
      { id: '1', fields: { Title: 'Процесс изготовления кухни', Type: 'Процесс', Status: 'Активна' } },
      { id: '2', fields: { Title: 'Результат работы', Type: 'Результат', Status: 'Активна' } },
      { id: '3', fields: { Title: 'Отзыв клиента', Type: 'Отзыв', Status: 'Активна' } }
    ],
    blogPosts: [
      { id: '1', fields: { Title: 'Как выбрать кухню', Category: 'Советы', Status: 'Опубликована' } },
      { id: '2', fields: { Title: 'Тренды в мебели 2024', Category: 'Тренды', Status: 'Черновик' } },
      { id: '3', fields: { Title: 'Материалы для кухни', Category: 'Материалы', Status: 'Опубликована' } }
    ],
    leads: [
      { id: '1', fields: { Name: 'Иван Петров', Phone: '+7 999 123-45-67', 'Service Type': 'Кухня', Status: 'Новая' } },
      { id: '2', fields: { Name: 'Мария Сидорова', Phone: '+7 999 234-56-78', 'Service Type': 'Гардероб', Status: 'В работе' } },
      { id: '3', fields: { Name: 'Алексей Козлов', Phone: '+7 999 345-67-89', 'Service Type': 'Дом под ключ', Status: 'Завершена' } }
    ]
  }

  useEffect(() => {
    loadData()
  }, [])

  const fetchFromAirtable = async (tableName: string) => {
    try {
      const response = await fetch(`https://api.airtable.com/v0/${airtableBase}/${tableName}`, {
        headers: {
          'Authorization': `Bearer ${airtableToken}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        console.error(`Ошибка загрузки ${tableName}:`, response.status)
        return []
      }
      
      const data = await response.json()
      return data.records || []
    } catch (error) {
      console.error(`Ошибка загрузки ${tableName}:`, error)
      return []
    }
  }

  const loadData = async () => {
    setLoading(true)
    setError('')
    
    try {
      const [projectsData, storiesData, blogData, leadsData] = await Promise.all([
        fetchFromAirtable('Projects'),
        fetchFromAirtable('Stories'),
        fetchFromAirtable('Blog Posts'),
        fetchFromAirtable('Leads')
      ])
      
      // Если данные из Airtable пустые, используем тестовые данные
      setProjects(projectsData.length > 0 ? projectsData : mockData.projects)
      setStories(storiesData.length > 0 ? storiesData : mockData.stories)
      setBlogPosts(blogData.length > 0 ? blogData : mockData.blogPosts)
      setLeads(leadsData.length > 0 ? leadsData : mockData.leads)
      
      if (projectsData.length === 0 && storiesData.length === 0 && blogData.length === 0 && leadsData.length === 0) {
        setError('Данные из Airtable не загружены. Показаны тестовые данные.')
      }
    } catch (error) {
      console.error('Ошибка загрузки данных:', error)
      setError('Ошибка загрузки данных. Показаны тестовые данные.')
      
      // Используем тестовые данные при ошибке
      setProjects(mockData.projects)
      setStories(mockData.stories)
      setBlogPosts(mockData.blogPosts)
      setLeads(mockData.leads)
    }
    setLoading(false)
  }

  const renderDashboard = () => (
    <div>
      {error && (
        <div className="alert alert-warning">
          <i className="fas fa-exclamation-triangle"></i>
          {error}
        </div>
      )}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon projects">
            <i className="fas fa-images"></i>
          </div>
          <div className="stat-number">{projects.length}</div>
          <div className="stat-label">Проектов</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stories">
            <i className="fas fa-video"></i>
          </div>
          <div className="stat-number">{stories.length}</div>
          <div className="stat-label">Stories</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blog">
            <i className="fas fa-edit"></i>
          </div>
          <div className="stat-number">{blogPosts.length}</div>
          <div className="stat-label">Статей</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon leads">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-number">{leads.length}</div>
          <div className="stat-label">Заявок</div>
        </div>
      </div>
    </div>
  )

  const renderProjects = () => (
    <div className="card">
      <div className="card-header">
        <h3>Управление проектами</h3>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-warning">
            <i className="fas fa-exclamation-triangle"></i>
            {error}
          </div>
        )}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Название</th>
                <th>Тип</th>
                <th>Город</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id}>
                  <td>{project.fields.Name || ''}</td>
                  <td>{project.fields.Type || ''}</td>
                  <td>{project.fields.City || ''}</td>
                  <td>
                    <span className={`badge ${project.fields.Status === 'Опубликован' ? 'badge-success' : 'badge-warning'}`}>
                      {project.fields.Status || 'Черновик'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderStories = () => (
    <div className="card">
      <div className="card-header">
        <h3>Управление Stories</h3>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-warning">
            <i className="fas fa-exclamation-triangle"></i>
            {error}
          </div>
        )}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Заголовок</th>
                <th>Тип</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {stories.map(story => (
                <tr key={story.id}>
                  <td>{story.fields.Title || ''}</td>
                  <td>{story.fields.Type || ''}</td>
                  <td>
                    <span className={`badge ${story.fields.Status === 'Активна' ? 'badge-success' : 'badge-danger'}`}>
                      {story.fields.Status || 'Неактивна'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderBlog = () => (
    <div className="card">
      <div className="card-header">
        <h3>Управление блогом</h3>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-warning">
            <i className="fas fa-exclamation-triangle"></i>
            {error}
          </div>
        )}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Заголовок</th>
                <th>Категория</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {blogPosts.map(post => (
                <tr key={post.id}>
                  <td>{post.fields.Title || ''}</td>
                  <td>{post.fields.Category || ''}</td>
                  <td>
                    <span className={`badge ${post.fields.Status === 'Опубликована' ? 'badge-success' : 'badge-warning'}`}>
                      {post.fields.Status || 'Черновик'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderLeads = () => (
    <div className="card">
      <div className="card-header">
        <h3>Заявки клиентов</h3>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-warning">
            <i className="fas fa-exclamation-triangle"></i>
            {error}
          </div>
        )}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Телефон</th>
                <th>Услуга</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => {
                const statusClass = lead.fields.Status === 'Новая' ? 'badge-danger' : 
                                  lead.fields.Status === 'В работе' ? 'badge-warning' : 'badge-success'
                return (
                  <tr key={lead.id}>
                    <td>{lead.fields.Name || ''}</td>
                    <td>
                      <a href={`tel:${lead.fields.Phone || ''}`}>
                        {lead.fields.Phone || ''}
                      </a>
                    </td>
                    <td>{lead.fields['Service Type'] || ''}</td>
                    <td>
                      <span className={`badge ${statusClass}`}>
                        {lead.fields.Status || 'Новая'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    if (loading) {
      return <div className="loading">Загрузка...</div>
    }

    switch (currentPage) {
      case 'dashboard':
        return renderDashboard()
      case 'projects':
        return renderProjects()
      case 'stories':
        return renderStories()
      case 'blog':
        return renderBlog()
      case 'leads':
        return renderLeads()
      default:
        return <p>Страница не найдена</p>
    }
  }

  const getPageTitle = () => {
    const titles = {
      'dashboard': 'Главная',
      'projects': 'Проекты',
      'stories': 'Stories',
      'blog': 'Блог',
      'leads': 'Заявки'
    }
    return titles[currentPage as keyof typeof titles] || 'Главная'
  }

  return (
    <div className="admin-container">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>Админ-панель</h2>
          <p>Мебель не для всех</p>
        </div>
        <ul className="sidebar-menu">
          <li className={currentPage === 'dashboard' ? 'active' : ''}>
            <a href="#" onClick={() => setCurrentPage('dashboard')}>
              <i className="fas fa-tachometer-alt"></i>
              Главная
            </a>
          </li>
          <li className={currentPage === 'projects' ? 'active' : ''}>
            <a href="#" onClick={() => setCurrentPage('projects')}>
              <i className="fas fa-images"></i>
              Проекты
              <span className="badge">{projects.length}</span>
            </a>
          </li>
          <li className={currentPage === 'stories' ? 'active' : ''}>
            <a href="#" onClick={() => setCurrentPage('stories')}>
              <i className="fas fa-video"></i>
              Stories
              <span className="badge">{stories.length}</span>
            </a>
          </li>
          <li className={currentPage === 'blog' ? 'active' : ''}>
            <a href="#" onClick={() => setCurrentPage('blog')}>
              <i className="fas fa-edit"></i>
              Блог
              <span className="badge">{blogPosts.length}</span>
            </a>
          </li>
          <li className={currentPage === 'leads' ? 'active' : ''}>
            <a href="#" onClick={() => setCurrentPage('leads')}>
              <i className="fas fa-users"></i>
              Заявки
              <span className="badge new">{leads.length}</span>
            </a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <a href="/" className="logout-btn">
            <i className="fas fa-home"></i>
            На главную
          </a>
        </div>
      </nav>
      
      <main className="main-content">
        <header className="content-header">
          <h1>{getPageTitle()}</h1>
          <button className="btn btn-primary" onClick={loadData}>
            <i className="fas fa-refresh"></i>
            Обновить
          </button>
        </header>
        <div className="content-area">
          {renderContent()}
        </div>
      </main>

      <style jsx>{`
        .admin-container {
          display: flex;
          min-height: 100vh;
        }
        
        .sidebar {
          width: 250px;
          background: #2c3e50;
          color: white;
          padding: 20px 0;
          display: flex;
          flex-direction: column;
        }
        
        .sidebar-header {
          padding: 0 20px 20px;
          border-bottom: 1px solid #34495e;
        }
        
        .sidebar-header h2 {
          font-size: 20px;
          margin-bottom: 5px;
        }
        
        .sidebar-header p {
          font-size: 14px;
          color: #bdc3c7;
        }
        
        .sidebar-menu {
          list-style: none;
          flex: 1;
          padding: 20px 0;
        }
        
        .sidebar-menu li {
          margin-bottom: 5px;
        }
        
        .sidebar-menu li a {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          color: #ecf0f1;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .sidebar-menu li a:hover,
        .sidebar-menu li.active a {
          background: #34495e;
          color: white;
        }
        
        .sidebar-menu li a i {
          margin-right: 10px;
          width: 20px;
        }
        
        .badge {
          background: #e74c3c;
          color: white;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 12px;
          margin-left: auto;
        }
        
        .badge.new {
          background: #27ae60;
        }
        
        .sidebar-footer {
          padding: 20px;
          border-top: 1px solid #34495e;
        }
        
        .logout-btn {
          width: 100%;
          padding: 10px;
          background: #3498db;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .logout-btn:hover {
          background: #2980b9;
        }
        
        .main-content {
          flex: 1;
          padding: 20px;
          background: #f8f9fa;
        }
        
        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #dee2e6;
        }
        
        .content-header h1 {
          font-size: 28px;
          color: #2c3e50;
        }
        
        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        
        .btn-primary {
          background: #3498db;
          color: white;
        }
        
        .btn-primary:hover {
          background: #2980b9;
        }
        
        .alert {
          padding: 12px 16px;
          border-radius: 5px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .alert-warning {
          background: #fff3cd;
          color: #856404;
          border: 1px solid #ffeaa7;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .stat-card {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          text-align: center;
          transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
        }
        
        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 24px;
          color: white;
        }
        
        .stat-icon.projects { background: #3498db; }
        .stat-icon.stories { background: #e74c3c; }
        .stat-icon.blog { background: #f39c12; }
        .stat-icon.leads { background: #27ae60; }
        
        .stat-number {
          font-size: 36px;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 10px;
        }
        
        .stat-label {
          color: #7f8c8d;
          font-size: 14px;
        }
        
        .card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin-bottom: 20px;
          overflow: hidden;
        }
        
        .card-header {
          padding: 20px;
          background: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
        }
        
        .card-header h3 {
          margin: 0;
          color: #2c3e50;
        }
        
        .card-body {
          padding: 20px;
        }
        
        .table-container {
          overflow-x: auto;
        }
        
        .table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .table th,
        .table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #dee2e6;
        }
        
        .table th {
          background: #f8f9fa;
          font-weight: 600;
          color: #2c3e50;
        }
        
        .table tr:hover {
          background: #f8f9fa;
        }
        
        .badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .badge-success {
          background: #d4edda;
          color: #155724;
        }
        
        .badge-warning {
          background: #fff3cd;
          color: #856404;
        }
        
        .badge-danger {
          background: #f8d7da;
          color: #721c24;
        }
        
        .loading {
          text-align: center;
          padding: 40px;
          color: #7f8c8d;
        }
        
        @media (max-width: 768px) {
          .admin-container {
            flex-direction: column;
          }
          
          .sidebar {
            width: 100%;
            order: 2;
          }
          
          .main-content {
            order: 1;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .content-header {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  )
} 