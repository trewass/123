const AUTH_CONFIG = {
    username: 'admin',
    password: '111111',
    tokenExpiry: 24 * 60 * 60 * 1000
};

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    if (currentPage.includes('login.html')) {
        setupLoginForm();
    } else {
        if (!checkAuth()) return;
    }
});

function setupLoginForm() {
    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', handleLogin);
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');
    
    if (username === AUTH_CONFIG.username && password === AUTH_CONFIG.password) {
        const token = btoa(JSON.stringify({
            username: username,
            timestamp: Date.now(),
            expires: Date.now() + AUTH_CONFIG.tokenExpiry
        }));
        localStorage.setItem('admin_token', token);
        window.location.href = 'index.html';
    } else {
        errorDiv.textContent = 'Неверный логин или пароль';
        errorDiv.style.display = 'block';
    }
}

function checkAuth() {
    const token = localStorage.getItem('admin_token');
    if (!token) {
        redirectToLogin();
        return false;
    }
    try {
        const tokenData = JSON.parse(atob(token));
        if (Date.now() > tokenData.expires) {
            localStorage.removeItem('admin_token');
            redirectToLogin();
            return false;
        }
        return true;
    } catch (error) {
        localStorage.removeItem('admin_token');
        redirectToLogin();
        return false;
    }
}

function redirectToLogin() {
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('admin_token');
    window.location.href = 'login.html';
} 