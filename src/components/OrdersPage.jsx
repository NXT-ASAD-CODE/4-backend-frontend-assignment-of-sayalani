import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function OrdersPage() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem('adminAuthenticated') !== 'true') {
      navigate('/dashboard', { replace: true })
      return
    }

    fetch('/api/order')
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Could not load orders')
        setOrders(data)
      })
      .catch((loadError) => setError(loadError.message))
  }, [navigate])

  if (sessionStorage.getItem('adminAuthenticated') !== 'true') return null

  return (
    <main style={{ padding: '56px 6vw', minHeight: '60vh', background: '#f7f8fc' }}>
      <h1 style={{ color: '#111936', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>Orders</h1>
      <p style={{ marginTop: '10px', color: '#667085' }}>Orders submitted from the shopping cart.</p>
      {error && <p role="alert" style={{ marginTop: '20px', color: '#b42318' }}>{error}</p>}
      <section style={{ marginTop: '28px', padding: '20px', overflowX: 'auto', borderRadius: '18px', background: '#fff', border: '1px solid #e5e7eb', boxShadow: '0 12px 28px rgba(17, 25, 54, 0.06)' }}>
        <table style={{ width: '100%', minWidth: '650px', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              {['Order', 'Items', 'Total', 'Status', 'Date'].map((heading) => <th key={heading} style={{ padding: '14px 12px', color: '#667085', fontSize: '12px', textTransform: 'uppercase' }}>{heading}</th>)}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={{ borderBottom: '1px solid #f0f2f5' }}>
                <td style={{ padding: '16px 12px', color: '#111936', fontWeight: 700 }}>#{String(order._id).slice(-6)}</td>
                <td style={{ padding: '16px 12px', color: '#667085' }}>{order.items?.length || 0}</td>
                <td style={{ padding: '16px 12px', color: '#111936', fontWeight: 700 }}>${Number(order.total || 0).toFixed(2)}</td>
                <td style={{ padding: '16px 12px' }}><span style={{ padding: '5px 10px', borderRadius: '999px', color: '#92400e', background: '#fef3c7', fontSize: '12px', fontWeight: 700 }}>{order.status || 'Pending'}</span></td>
                <td style={{ padding: '16px 12px', color: '#667085' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!orders.length && <p style={{ padding: '24px 12px', color: '#667085' }}>No orders found.</p>}
      </section>
    </main>
  )
}

export default OrdersPage
