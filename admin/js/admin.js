class AdminPanel {
    constructor() {
        this.currentPage = 'dashboard';
        this.airtableBase = 'appayVD9m1J1bR13Z';
        this.airtableToken = 'patQfujQaKiRKW0ix.9968ac4d5d84d30dc7f7ac663c993282324a6cfb07125313b2c58268f943b4ee';
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadDashboard();
        this.updateCounts();
    }
    
    setupEventListeners() {
        document.querySelectorAll('[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.closest('[data-page]').dataset.page;
                this.loadPage(page);
            });
        });
        
        document.getElementById('add-new-btn').addEventListener('click', () => {
            this.openAddModal();
        });
        
        document.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal();
        });
        
        document.getElementById('modal-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeModal();
            }
        });
    }
    
    async loadPage(page) {
        this.currentPage = page;
        
        document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
        document.querySelector(`[data-page="${page}"]`).closest('li').classList.add('active');
        
        const titles = {
            'dashboard': 'Главная',
            'projects': 'Проекты',
            'stories': 'Stories',
            'blog': 'Блог',
            'leads': 'Заявки'
        };
        document.getElementById('page-title').textContent = titles[page];
        
        const showAddBtn = ['projects', 'stories', 'blog'].includes(page);
        document.getElementById('add-new-btn').style.display = showAddBtn ? 'block' : 'none';
        
        const content = await this.getPageContent(page);
        document.getElementById('content-area').innerHTML = content;
    }
    
    async getPageContent(page) {
        switch (page) {
            case 'dashboard':
                return this.getDashboardContent();
            case 'projects':
                return await this.getProjectsContent();
            case 'stories':
                return await this.getStoriesContent();
            case 'blog':
                return await this.getBlogContent();
            case 'leads':
                return await this.getLeadsContent();
            default:
                return '<p>Страница не найдена</p>';
        }
    }
    
    getDashboardContent() {
        return `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon projects"><i class="fas fa-images"></i></div>
                    <div class="stat-number" id="dash-projects">0</div>
                    <div class="stat-label">Проектов</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon stories"><i class="fas fa-video"></i></div>
                    <div class="stat-number" id="dash-stories">0</div>
                    <div class="stat-label">Stories</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon blog"><i class="fas fa-edit"></i></div>
                    <div class="stat-number" id="dash-blog">0</div>
                    <div class="stat-label">Статей</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon leads"><i class="fas fa-users"></i></div>
                    <div class="stat-number" id="dash-leads">0</div>
                    <div class="stat-label">Заявок</div>
                </div>
            </div>
        `;
    }
    
    async getProjectsContent() {
        const projects = await this.fetchFromAirtable('Projects');
        let html = `
            <div class="card">
                <div class="card-header"><h3>Управление проектами</h3></div>
                <div class="card-body">
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Тип</th>
                                    <th>Город</th>
                                    <th>Статус</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
        `;
        
        projects.forEach(project => {
            html += `
                <tr>
                    <td>${project.fields.Name || ''}</td>
                    <td>${project.fields.Type || ''}</td>
                    <td>${project.fields.City || ''}</td>
                    <td><span class="badge ${project.fields.Status === 'Опубликован' ? 'badge-success' : 'badge-warning'}">${project.fields.Status || 'Черновик'}</span></td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="adminPanel.deleteProject('${project.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        html += `</tbody></table></div></div></div>`;
        return html;
    }
    
    async getStoriesContent() {
        const stories = await this.fetchFromAirtable('Stories');
        let html = `
            <div class="card">
                <div class="card-header"><h3>Управление Stories</h3></div>
                <div class="card-body">
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Заголовок</th>
                                    <th>Тип</th>
                                    <th>Статус</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
        `;
        
        stories.forEach(story => {
            html += `
                <tr>
                    <td>${story.fields.Title || ''}</td>
                    <td>${story.fields.Type || ''}</td>
                    <td><span class="badge ${story.fields.Status === 'Активна' ? 'badge-success' : 'badge-danger'}">${story.fields.Status || 'Неактивна'}</span></td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="adminPanel.deleteStory('${story.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        html += `</tbody></table></div></div></div>`;
        return html;
    }
    
    async getBlogContent() {
        const posts = await this.fetchFromAirtable('Blog Posts');
        let html = `
            <div class="card">
                <div class="card-header"><h3>Управление блогом</h3></div>
                <div class="card-body">
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Заголовок</th>
                                    <th>Категория</th>
                                    <th>Статус</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
        `;
        
        posts.forEach(post => {
            html += `
                <tr>
                    <td>${post.fields.Title || ''}</td>
                    <td>${post.fields.Category || ''}</td>
                    <td><span class="badge ${post.fields.Status === 'Опубликована' ? 'badge-success' : 'badge-warning'}">${post.fields.Status || 'Черновик'}</span></td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="adminPanel.deletePost('${post.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        html += `</tbody></table></div></div></div>`;
        return html;
    }
    
    async getLeadsContent() {
        const leads = await this.fetchFromAirtable('Leads');
        let html = `
            <div class="card">
                <div class="card-header"><h3>Заявки клиентов</h3></div>
                <div class="card-body">
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Имя</th>
                                    <th>Телефон</th>
                                    <th>Услуга</th>
                                    <th>Статус</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
        `;
        
        leads.forEach(lead => {
            const statusClass = lead.fields.Status === 'Новая' ? 'badge-danger' : 
                              lead.fields.Status === 'В работе' ? 'badge-warning' : 'badge-success';
            html += `
                <tr>
                    <td>${lead.fields.Name || ''}</td>
                    <td><a href="tel:${lead.fields.Phone || ''}">${lead.fields.Phone || ''}</a></td>
                    <td>${lead.fields['Service Type'] || ''}</td>
                    <td><span class="badge ${statusClass}">${lead.fields.Status || 'Новая'}</span></td>
                    <td>
                        <button class="btn btn-sm btn-success" onclick="adminPanel.updateLeadStatus('${lead.id}', 'В работе')">
                            <i class="fas fa-play"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        html += `</tbody></table></div></div></div>`;
        return html;
    }
    
    // API методы
    async fetchFromAirtable(tableName, params = {}) {
        try {
            const url = new URL(`https://api.airtable.com/v0/${this.airtableBase}/${tableName}`);
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.airtableToken}`,
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await response.json();
            return data.records || [];
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            return [];
        }
    }
    
    async saveToAirtable(tableName, data) {
        try {
            const response = await fetch(`https://api.airtable.com/v0/${this.airtableBase}/${tableName}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.airtableToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fields: data })
            });
            return await response.json();
        } catch (error) {
            console.error('Ошибка сохранения:', error);
            throw error;
        }
    }
    
    async deleteFromAirtable(tableName, recordId) {
        try {
            const response = await fetch(`https://api.airtable.com/v0/${this.airtableBase}/${tableName}/${recordId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${this.airtableToken}` }
            });
            return response.ok;
        } catch (error) {
            console.error('Ошибка удаления:', error);
            throw error;
        }
    }
    
    async updateAirtable(tableName, recordId, data) {
        try {
            const response = await fetch(`https://api.airtable.com/v0/${this.airtableBase}/${tableName}/${recordId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${this.airtableToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fields: data })
            });
            return await response.json();
        } catch (error) {
            console.error('Ошибка обновления:', error);
            throw error;
        }
    }
    
    async updateCounts() {
        try {
            const [projects, stories, blog, leads] = await Promise.all([
                this.fetchFromAirtable('Projects'),
                this.fetchFromAirtable('Stories'),
                this.fetchFromAirtable('Blog Posts'),
                this.fetchFromAirtable('Leads')
            ]);
            
            document.getElementById('projects-count').textContent = projects.length;
            document.getElementById('stories-count').textContent = stories.length;
            document.getElementById('blog-count').textContent = blog.length;
            document.getElementById('leads-count').textContent = leads.length;
            
            if (document.getElementById('dash-projects')) {
                document.getElementById('dash-projects').textContent = projects.length;
                document.getElementById('dash-stories').textContent = stories.length;
                document.getElementById('dash-blog').textContent = blog.length;
                document.getElementById('dash-leads').textContent = leads.length;
            }
        } catch (error) {
            console.error('Ошибка обновления счетчиков:', error);
        }
    }
    
    // Модальные окна
    openModal(title, content) {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-body').innerHTML = content;
        document.getElementById('modal-overlay').classList.add('show');
    }
    
    closeModal() {
        document.getElementById('modal-overlay').classList.remove('show');
    }
    
    openAddModal() {
        let content = '';
        let title = '';
        
        switch (this.currentPage) {
            case 'projects':
                title = 'Добавить проект';
                content = `
                    <form id="project-form">
                        <div class="form-group">
                            <label>Название проекта *</label>
                            <input type="text" name="name" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>Тип проекта *</label>
                            <select name="type" class="form-control" required>
                                <option value="">Выберите тип</option>
                                <option value="Кухня">Кухня</option>
                                <option value="Гардероб">Гардероб</option>
                                <option value="Ванная">Ванная</option>
                                <option value="Дом под ключ">Дом под ключ</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Город *</label>
                            <input type="text" name="city" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>Описание</label>
                            <textarea name="description" class="form-control" rows="4"></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn-success">Сохранить</button>
                            <button type="button" class="btn btn-secondary" onclick="adminPanel.closeModal()">Отмена</button>
                        </div>
                    </form>
                `;
                break;
                
            case 'stories':
                title = 'Добавить историю';
                content = `
                    <form id="story-form">
                        <div class="form-group">
                            <label>Заголовок истории *</label>
                            <input type="text" name="title" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>Тип контента *</label>
                            <select name="type" class="form-control" required>
                                <option value="">Выберите тип</option>
                                <option value="Процесс">Процесс</option>
                                <option value="Результат">Результат</option>
                                <option value="Отзыв">Отзыв</option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn-success">Сохранить</button>
                            <button type="button" class="btn btn-secondary" onclick="adminPanel.closeModal()">Отмена</button>
                        </div>
                    </form>
                `;
                break;
                
            case 'blog':
                title = 'Добавить статью';
                content = `
                    <form id="blog-form">
                        <div class="form-group">
                            <label>Заголовок статьи *</label>
                            <input type="text" name="title" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>Содержание статьи *</label>
                            <textarea name="content" class="form-control" rows="10" required></textarea>
                        </div>
                        <div class="form-group">
                            <label>Категория</label>
                            <select name="category" class="form-control">
                                <option value="Советы">Советы</option>
                                <option value="Тренды">Тренды</option>
                                <option value="Материалы">Материалы</option>
                                <option value="Процесс">Процесс</option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn-success">Сохранить</button>
                            <button type="button" class="btn btn-secondary" onclick="adminPanel.closeModal()">Отмена</button>
                        </div>
                    </form>
                `;
                break;
        }
        
        this.openModal(title, content);
        
        // Обработчики форм
        setTimeout(() => {
            const projectForm = document.getElementById('project-form');
            const storyForm = document.getElementById('story-form');
            const blogForm = document.getElementById('blog-form');
            
            if (projectForm) {
                projectForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData.entries());
                    
                    try {
                        await this.saveToAirtable('Projects', {
                            'Name': data.name,
                            'Type': data.type,
                            'City': data.city,
                            'Description': data.description,
                            'Status': 'Черновик'
                        });
                        this.showNotification('Проект сохранен!', 'success');
                        this.closeModal();
                        this.loadPage('projects');
                        this.updateCounts();
                    } catch (error) {
                        this.showNotification('Ошибка сохранения', 'error');
                    }
                });
            }
            
            if (storyForm) {
                storyForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData.entries());
                    
                    try {
                        await this.saveToAirtable('Stories', {
                            'Title': data.title,
                            'Type': data.type,
                            'Status': 'Активна'
                        });
                        this.showNotification('История сохранена!', 'success');
                        this.closeModal();
                        this.loadPage('stories');
                        this.updateCounts();
                    } catch (error) {
                        this.showNotification('Ошибка сохранения', 'error');
                    }
                });
            }
            
            if (blogForm) {
                blogForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData.entries());
                    
                    try {
                        await this.saveToAirtable('Blog Posts', {
                            'Title': data.title,
                            'Content': data.content,
                            'Category': data.category,
                            'Status': 'Черновик',
                            'Author': 'Администратор'
                        });
                        this.showNotification('Статья сохранена!', 'success');
                        this.closeModal();
                        this.loadPage('blog');
                        this.updateCounts();
                    } catch (error) {
                        this.showNotification('Ошибка сохранения', 'error');
                    }
                });
            }
        }, 100);
    }
    
    // Методы управления
    async deleteProject(id) {
        if (confirm('Удалить проект?')) {
            try {
                await this.deleteFromAirtable('Projects', id);
                this.showNotification('Проект удален', 'success');
                this.loadPage('projects');
                this.updateCounts();
            } catch (error) {
                this.showNotification('Ошибка удаления', 'error');
            }
        }
    }
    
    async deleteStory(id) {
        if (confirm('Удалить историю?')) {
            try {
                await this.deleteFromAirtable('Stories', id);
                this.showNotification('История удалена', 'success');
                this.loadPage('stories');
                this.updateCounts();
            } catch (error) {
                this.showNotification('Ошибка удаления', 'error');
            }
        }
    }
    
    async deletePost(id) {
        if (confirm('Удалить статью?')) {
            try {
                await this.deleteFromAirtable('Blog Posts', id);
                this.showNotification('Статья удалена', 'success');
                this.loadPage('blog');
                this.updateCounts();
            } catch (error) {
                this.showNotification('Ошибка удаления', 'error');
            }
        }
    }
    
    async updateLeadStatus(id, status) {
        try {
            await this.updateAirtable('Leads', id, { 'Status': status });
            this.showNotification('Статус обновлен', 'success');
            this.loadPage('leads');
        } catch (error) {
            this.showNotification('Ошибка обновления', 'error');
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Инициализация админ-панели
let adminPanel;
document.addEventListener('DOMContentLoaded', function() {
    adminPanel = new AdminPanel();
}); 