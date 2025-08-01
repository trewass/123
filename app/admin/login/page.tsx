'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (username === 'admin' && password === '111111') {
      const token = btoa(JSON.stringify({
        username: username,
        timestamp: Date.now(),
        expires: Date.now() + (24 * 60 * 60 * 1000)
      }))
      localStorage.setItem('admin_token', token)
      router.push('/admin')
    } else {
      setError('Неверный логин или пароль')
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h2>Вход в админ-панель</h2>
          <p>Мебель не для всех</p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Логин</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Войти
            </button>
          </form>
          {error && (
            <div className="error-message" style={{ display: 'block' }}>
              {error}
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .login-page {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .login-container {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
        }
        
        .login-form h2 {
          text-align: center;
          margin-bottom: 10px;
          color: #333;
        }
        
        .login-form p {
          text-align: center;
          color: #666;
          margin-bottom: 30px;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          color: #2c3e50;
        }
        
        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
          transition: border-color 0.3s ease;
        }
        
        .form-group input:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
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
        
        .btn-block {
          width: 100%;
          justify-content: center;
        }
        
        .error-message {
          background: #f8d7da;
          color: #721c24;
          padding: 10px;
          border-radius: 5px;
          margin-top: 10px;
        }
      `}</style>
    </div>
  )
} 