import React, { useState } from 'react'

const ADMIN_EMAIL = 'admin@example.com'
const ADMIN_PASSWORD = 'admin123'

function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
      return
    }

    setError('Invalid admin email or password.')
  }

  if (!isAuthenticated) {
    return (
      <main style={{ display: 'grid', placeItems: 'center', minHeight: '60vh', padding: '40px 20px' }}>
        <form
          onSubmit={handleSubmit}
          style={{ width: 'min(100%, 420px)', padding: '32px', border: '1px solid #e5e5e5', borderRadius: '12px', background: '#fff' }}
        >
          <h1 style={{ color: '#111', marginBottom: '8px' }}>Admin Login</h1>
          <p style={{ marginBottom: '24px', color: '#666' }}>Enter your admin credentials to access the dashboard.</p>
          <label style={{ display: 'block', color: '#111', marginBottom: '8px' }} htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="username"
            style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '6px' }}
          />
          <label style={{ display: 'block', color: '#111', marginBottom: '8px' }} htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
            style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '6px' }}
          />
          {error && <p role="alert" style={{ color: '#c62828', marginBottom: '16px' }}>{error}</p>}
          <button
            type="submit"
            style={{ width: '100%', padding: '12px', border: 0, borderRadius: '6px', background: '#111', color: '#fff', cursor: 'pointer' }}
          >
            Sign in
          </button>
        </form>
      </main>
    )
  }

  return (
    <main style={{ padding: '72px 6vw', minHeight: '60vh' }}>
      <h2 style={{ color: '#111', fontSize: 'clamp(2rem, 4vw, 4rem)', lineHeight: 1.1 }}>
        Dashboard
      </h2>
      <p style={{ marginTop: '16px' }}>Welcome to your dashboard.</p>
    </main>
  )
}

export default DashboardPage