import React, { useEffect, useState } from 'react'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'

const ADMIN_EMAIL = 'admin@example.com'
const ADMIN_PASSWORD = 'admin123'

function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [stats, setStats] = useState({ products: 0, users: 0, orders: 0 })
  const [statsError, setStatsError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
      return
    }

    setError('Invalid admin email or password.')
  }

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats')
        if (!response.ok) throw new Error('Failed to load dashboard statistics')
        setStats(await response.json())
      } catch (statsLoadError) {
        console.error('Failed to load dashboard statistics:', statsLoadError)
        setStatsError('Dashboard statistics could not be loaded.')
      }
    }

    loadStats()
  }, [])

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
    <main style={{ padding: '56px 6vw', minHeight: '60vh', background: '#f7f8fc' }}>
      <h1 style={{ color: '#111', fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
        Welcome to the Dashboard
      </h1>
      <p style={{ marginTop: '12px', color: '#666' }}>Here is a quick overview of your store.</p>

      {statsError && <p role="alert" style={{ marginTop: '24px', color: '#b42318' }}>{statsError}</p>}

      <section
        aria-label="Dashboard statistics"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          marginTop: '36px',
        }}
      >
        {[
          {
            label: 'Total Products',
            value: stats.products,
            icon: Inventory2OutlinedIcon,
            color: '#2563eb',
            background: '#eff6ff',
          },
          {
            label: 'Total Users',
            value: stats.users,
            icon: PeopleAltOutlinedIcon,
            color: '#059669',
            background: '#ecfdf5',
          },
          {
            label: 'Total Orders',
            value: stats.orders,
            icon: ShoppingBagOutlinedIcon,
            color: '#d97706',
            background: '#fffbeb',
          },
        ].map(({ label, value, icon: Icon, color, background }) => (
          <article
            key={label}
            style={{
              position: 'relative',
              overflow: 'hidden',
              padding: '26px',
              minHeight: '170px',
              borderRadius: '18px',
              background: `linear-gradient(145deg, #fff 0%, ${background} 180%)`,
              border: '1px solid #e5e7eb',
              boxShadow: '0 12px 28px rgba(17, 25, 54, 0.08)',
            }}
          >
            <div
              style={{
                display: 'grid',
                placeItems: 'center',
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                color,
                background,
              }}
            >
              <Icon fontSize="medium" />
            </div>
            <p style={{ marginTop: '20px', color: '#667085', fontSize: '14px', fontWeight: 700 }}>{label}</p>
            <p style={{ marginTop: '4px', color: '#111936', fontSize: '38px', lineHeight: 1.1, fontWeight: 800 }}>{value}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default DashboardPage