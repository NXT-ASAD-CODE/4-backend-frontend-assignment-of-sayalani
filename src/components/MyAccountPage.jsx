import React, { useEffect, useState } from 'react'

function MyAccountPage() {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const customerId = localStorage.getItem('customerId')
    if (!customerId) return

    fetch(`/api/order?customerId=${encodeURIComponent(customerId)}`)
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Could not load your orders')
        setOrders(data)
      })
      .catch((loadError) => setError(loadError.message))
  }, [])

  const statusStyle = {
    Pending: { color: '#92400e', background: '#fef3c7' },
    Approved: { color: '#047857', background: '#ecfdf3' },
    Rejected: { color: '#b42318', background: '#fef3f2' },
  }

  return (
    <main style={{ padding: '56px 6vw', minHeight: '60vh', background: '#f7f8fc' }}>
      <h1 style={{ color: '#111936', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>My Account</h1>
      <p style={{ marginTop: '10px', color: '#667085' }}>Track your submitted orders and their status.</p>
      {error && <p role="alert" style={{ marginTop: '20px', color: '#b42318' }}>{error}</p>}
      <section style={{ marginTop: '28px', display: 'grid', gap: '16px' }}>
        {orders.map((order) => (
          <article key={String(order._id)} style={{ padding: '22px', borderRadius: '16px', background: '#fff', border: '1px solid #e5e7eb', boxShadow: '0 8px 20px rgba(17, 25, 54, 0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <strong style={{ color: '#111936' }}>Order #{String(order._id).slice(-6)}</strong>
              <span style={{ padding: '6px 11px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, ...(statusStyle[order.status] || statusStyle.Pending) }}>{order.status || 'Pending'}</span>
            </div>
            <p style={{ marginTop: '12px', color: '#667085' }}>{order.items?.length || 0} item(s) · ${Number(order.total || 0).toFixed(2)}</p>
            <p style={{ marginTop: '6px', color: '#98a2b3', fontSize: '13px' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
          </article>
        ))}
        {!orders.length && !error && <p style={{ color: '#667085' }}>You have no submitted orders yet.</p>}
      </section>
    </main>
  )
}

export default MyAccountPage
