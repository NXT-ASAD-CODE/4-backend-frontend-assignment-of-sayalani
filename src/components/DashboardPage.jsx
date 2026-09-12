import React, { useEffect, useState } from 'react'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined'

const ADMIN_EMAIL = 'admin@example.com'
const ADMIN_PASSWORD = 'admin123'
const SALES_OVERVIEW = [
  { label: 'Apr', value: 4200 },
  { label: 'May', value: 5800 },
  { label: 'Jun', value: 4900 },
  { label: 'Jul', value: 7200 },
  { label: 'Aug', value: 6500 },
  { label: 'Sep', value: 8100 },
]

function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [stats, setStats] = useState({ products: 0, users: 0, orders: 0 })
  const [inventory, setInventory] = useState([])
  const [statsError, setStatsError] = useState('')
  const [inventoryError, setInventoryError] = useState('')
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false)
  const [productFormError, setProductFormError] = useState('')
  const [productForm, setProductForm] = useState({
    category: 'New Arrivals',
    title: '',
    price: '',
    description: '',
    colors: '',
    sizes: '',
    image: null,
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
      return
    }

    setError('Invalid admin email or password.')
  }

  const handleProductFieldChange = (event) => {
    const { name, value, files } = event.target
    setProductForm((currentForm) => ({ ...currentForm, [name]: files ? files[0] : value }))
  }

  const handleProductCreate = async (event) => {
    event.preventDefault()
    setIsSubmittingProduct(true)
    setProductFormError('')

    try {
      const formData = new FormData()
      Object.entries(productForm).forEach(([key, value]) => {
        if (key === 'image') {
          if (value) formData.append('image', value)
        } else if (key === 'colors' || key === 'sizes') {
          formData.append(key, JSON.stringify(value.split(',').map((item) => item.trim()).filter(Boolean)))
        } else {
          formData.append(key, value)
        }
      })

      const response = await fetch('/api/products', { method: 'POST', body: formData })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Product could not be created')

      setInventory((currentInventory) => [result, ...currentInventory])
      setStats((currentStats) => ({ ...currentStats, products: currentStats.products + 1 }))
      setProductForm({ category: 'New Arrivals', title: '', price: '', description: '', colors: '', sizes: '', image: null })
      setIsAddProductOpen(false)
    } catch (createError) {
      console.error('Failed to create product:', createError)
      setProductFormError(createError.message)
    } finally {
      setIsSubmittingProduct(false)
    }
  }

  useEffect(() => {
    const loadDashboardData = async () => {
      const [statsResult, productsResult] = await Promise.allSettled([
        fetch('/api/dashboard/stats'),
        fetch('/api/products'),
      ])

      if (statsResult.status === 'fulfilled' && statsResult.value.ok) {
        setStats(await statsResult.value.json())
      } else {
        console.error('Failed to load dashboard statistics:', statsResult.reason || statsResult.value?.status)
        setStatsError('Dashboard statistics could not be loaded.')
      }

      if (productsResult.status === 'fulfilled' && productsResult.value.ok) {
        setInventory(await productsResult.value.json())
      } else {
        console.error('Failed to load products:', productsResult.reason || productsResult.value?.status)
        setInventoryError('Product data could not be loaded.')
      }
    }

    loadDashboardData()
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
        <h1 style={{ color: '#111', fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
          Welcome to the Dashboard
        </h1>
        <button
          type="button"
          aria-label="Add product"
          onClick={() => {
            setProductFormError('')
            setIsAddProductOpen(true)
          }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 18px', border: 0, borderRadius: '10px', color: '#fff', background: '#111936', fontSize: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 18px rgba(17, 25, 54, 0.18)' }}
        >
          <AddCircleOutlineIcon fontSize="small" />
          Add product
        </button>
      </div>
      <p style={{ marginTop: '12px', color: '#666' }}>Here is a quick overview of your store.</p>

      {isAddProductOpen && (
        <section style={{ marginTop: '28px', padding: '28px', borderRadius: '18px', background: '#fff', border: '1px solid #e5e7eb', boxShadow: '0 12px 28px rgba(17, 25, 54, 0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
            <div>
              <h2 style={{ color: '#111936', fontSize: '22px' }}>Add Product</h2>
              <p style={{ marginTop: '6px', color: '#667085', fontSize: '14px' }}>Create a new product in MongoDB.</p>
            </div>
            <button type="button" onClick={() => setIsAddProductOpen(false)} style={{ border: 0, background: 'transparent', color: '#667085', cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}>Cancel</button>
          </div>

          <form onSubmit={handleProductCreate} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginTop: '24px' }}>
            {[
              ['title', 'Product Title', 'text'],
              ['price', 'Product Price', 'number'],
              ['colors', 'Product Colors', 'text'],
              ['sizes', 'Product Sizes', 'text'],
            ].map(([name, label, type]) => (
              <label key={name} style={{ display: 'grid', gap: '8px', color: '#344054', fontSize: '13px', fontWeight: 700 }}>
                {label}
                <input name={name} type={type} value={productForm[name]} onChange={handleProductFieldChange} required min={type === 'number' ? '0' : undefined} placeholder={name === 'colors' || name === 'sizes' ? 'Separate values with commas' : ''} style={{ width: '100%', padding: '12px 14px', border: '1px solid #344054', borderRadius: '9px', color: '#fff', background: '#111936' }} />
              </label>
            ))}
            <label style={{ display: 'grid', gap: '8px', color: '#344054', fontSize: '13px', fontWeight: 700 }}>
              Category
              <select name="category" value={productForm.category} onChange={handleProductFieldChange} style={{ width: '100%', padding: '12px 14px', border: '1px solid #344054', borderRadius: '9px', color: '#fff', background: '#111936' }}>
                {['New Arrivals', 'Top Selling', 'Women', 'Men', 'Accessories'].map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>
            <label style={{ display: 'grid', gap: '8px', color: '#344054', fontSize: '13px', fontWeight: 700 }}>
              Product Image
              <input name="image" type="file" accept="image/*" onChange={handleProductFieldChange} required style={{ width: '100%', padding: '9px', border: '1px solid #344054', borderRadius: '9px', color: '#fff', background: '#111936' }} />
            </label>
            <label style={{ display: 'grid', gridColumn: '1 / -1', gap: '8px', color: '#344054', fontSize: '13px', fontWeight: 700 }}>
              Product Description
              <textarea name="description" value={productForm.description} onChange={handleProductFieldChange} required rows="4" style={{ width: '100%', resize: 'vertical', padding: '12px 14px', border: '1px solid #344054', borderRadius: '9px', color: '#fff', background: '#111936' }} />
            </label>
            {productFormError && <p role="alert" style={{ gridColumn: '1 / -1', color: '#b42318' }}>{productFormError}</p>}
            <button type="submit" disabled={isSubmittingProduct} style={{ gridColumn: '1 / -1', justifySelf: 'start', padding: '12px 20px', border: 0, borderRadius: '9px', color: '#fff', background: isSubmittingProduct ? '#98a2b3' : '#111936', fontWeight: 700, cursor: isSubmittingProduct ? 'wait' : 'pointer' }}>
              {isSubmittingProduct ? 'Saving product...' : 'Save product'}
            </button>
          </form>
        </section>
      )}

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

      <section
        aria-label="Sales overview"
        style={{
          marginTop: '28px',
          padding: '28px',
          borderRadius: '18px',
          background: '#fff',
          border: '1px solid #e5e7eb',
          boxShadow: '0 12px 28px rgba(17, 25, 54, 0.06)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ color: '#111936', fontSize: '22px' }}>Sales Overview</h2>
            <p style={{ marginTop: '6px', color: '#667085', fontSize: '14px' }}>Monthly sales performance</p>
          </div>
          <span style={{ color: '#2563eb', fontSize: '13px', fontWeight: 700 }}>Last 6 months</span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'end',
            gap: 'clamp(10px, 3vw, 28px)',
            height: '240px',
            marginTop: '28px',
            padding: '20px 8px 0',
            borderBottom: '1px solid #e5e7eb',
          }}
        >
          {SALES_OVERVIEW.map(({ label, value }) => {
            const maximumSales = Math.max(...SALES_OVERVIEW.map((item) => item.value), 1)
            const barHeight = `${Math.max((value / maximumSales) * 100, value > 0 ? 4 : 0)}%`

            return (
              <div key={label} style={{ display: 'flex', flex: 1, height: '100%', flexDirection: 'column', justifyContent: 'end', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#475467', fontSize: '12px', fontWeight: 700 }}>${Number(value).toLocaleString()}</span>
                <div
                  title={`${label}: $${Number(value).toLocaleString()}`}
                  style={{ width: 'min(44px, 70%)', height: barHeight, minHeight: value > 0 ? '8px' : 0, borderRadius: '8px 8px 0 0', background: 'linear-gradient(180deg, #60a5fa 0%, #2563eb 100%)', transition: 'height 300ms ease' }}
                />
                <span style={{ color: '#667085', fontSize: '13px' }}>{label}</span>
              </div>
            )
          })}
        </div>
      </section>

      <section
        aria-label="Inventory"
        style={{
          marginTop: '28px',
          padding: '28px',
          overflowX: 'auto',
          borderRadius: '18px',
          background: '#fff',
          border: '1px solid #e5e7eb',
          boxShadow: '0 12px 28px rgba(17, 25, 54, 0.06)',
        }}
      >
        <h2 style={{ color: '#111936', fontSize: '22px' }}>Inventory</h2>
        <p style={{ marginTop: '6px', color: '#667085', fontSize: '14px' }}>All products fetched from MongoDB</p>
        {inventoryError && <p role="alert" style={{ marginTop: '16px', color: '#b42318' }}>{inventoryError}</p>}
        <table style={{ width: '100%', minWidth: '620px', marginTop: '22px', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              {['Title', 'Category', 'Price', 'In Stock'].map((heading) => (
                <th key={heading} style={{ padding: '14px 12px', color: '#667085', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inventory.map((product) => {
              const hasStockField = product.inStock !== undefined || product.stock !== undefined
              const isInStock = product.inStock ?? (hasStockField ? Number(product.stock) > 0 : true)

              return (
                <tr key={product.id || product._id} style={{ borderBottom: '1px solid #f0f2f5' }}>
                  <td style={{ padding: '16px 12px', color: '#111936', fontWeight: 700 }}>{product.title || product.name}</td>
                  <td style={{ padding: '16px 12px', color: '#667085' }}>{product.category || 'Uncategorized'}</td>
                  <td style={{ padding: '16px 12px', color: '#111936', fontWeight: 600 }}>${Number(product.price || 0).toLocaleString()}</td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{ display: 'inline-block', padding: '5px 10px', borderRadius: '999px', color: isInStock ? '#047857' : '#b42318', background: isInStock ? '#ecfdf3' : '#fef3f2', fontSize: '12px', fontWeight: 700 }}>
                      {isInStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {inventory.length === 0 && <p style={{ padding: '24px 12px', color: '#667085' }}>No products found.</p>}
      </section>
    </main>
  )
}

export default DashboardPage