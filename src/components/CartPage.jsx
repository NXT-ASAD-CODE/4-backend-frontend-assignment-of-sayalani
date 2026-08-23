import React from 'react'
import { Link } from 'react-router-dom'

function CartPage({ cartItems = [], onUpdateQuantity, onRemove }) {
  const totalItems = cartItems.reduce((count, item) => count + Number(item.quantity || 1), 0)
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  )

  if (!cartItems.length) {
    return (
      <div className="product-page">
        <div className="product-page-empty" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2>Your cart is empty</h2>
          <p style={{ marginBottom: '20px', color: '#666' }}>
            Add some products to continue shopping.
          </p>
          <Link to="/" className="back-home-btn">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="product-page" style={{ padding: '30px 20px 60px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '24px' }}>Shopping Cart ({totalItems} items)</h2>

        <div style={{ display: 'grid', gap: '20px' }}>
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
              style={{
                display: 'flex',
                gap: '18px',
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: '14px',
                padding: '18px',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '120px', height: '150px', objectFit: 'cover', borderRadius: '12px' }}
              />

              <div style={{ flex: 1, minWidth: '220px' }}>
                <h3 style={{ margin: '0 0 8px' }}>{item.name}</h3>
                <p style={{ margin: '0 0 8px', color: '#666' }}>
                  Color: {item.selectedColor} | Size: {item.selectedSize}
                </p>
                <p style={{ margin: '0 0 12px', fontWeight: 700 }}>
                  RS : ${Number(item.price || 0) * Number(item.quantity || 1)}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <div className="quantity-box" style={{ display: 'inline-flex' }}>
                    <button
                      type="button"
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.selectedColor, item.selectedSize, Number(item.quantity || 1) - 1)}
                    >
                      −
                    </button>
                    <span className="quantity-value" style={{ minWidth: '32px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.selectedColor, item.selectedSize, Number(item.quantity || 1) + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemove && onRemove(item.id, item.selectedColor, item.selectedSize)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: '#b3261e',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="cart-summary-box"
          style={{
            marginTop: '30px',
            padding: '24px',
            borderRadius: '14px',
            background: '#f7f7f7',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          <div className="cart-summary-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', width: '100%', flexDirection: 'row' }}>
            <h3 style={{ margin: 0 }}>Subtotal</h3>
            <h3 style={{ margin: 0 }}>RS : ${subtotal.toFixed(2)}</h3>
          </div>
          <Link to="/" className="back-home-btn" style={{ marginTop: '18px', display: 'inline-block' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartPage
