import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const categories = ['New Arrivals', 'Top Selling', 'Women', 'Men', 'Accessories']

const getProductKey = (product) => product._id || product.id

function ProductManagementPage() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [products, setProducts] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (!response.ok) throw new Error('Could not load products')
      setProducts(await response.json())
    } catch (loadError) {
      setError(loadError.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('adminAuthenticated') !== 'true') {
      navigate('/dashboard', { replace: true })
      return
    }

    setIsAuthenticated(true)
    loadProducts()
  }, [navigate])

  const startEditing = (product) => {
    setEditingId(getProductKey(product))
    setEditForm({
      title: product.title || product.name || '',
      category: product.category || 'New Arrivals',
      price: product.price || 0,
      description: product.description || '',
      colors: Array.isArray(product.colors) ? product.colors.join(', ') : '',
      sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : '',
      image: product.image || '',
    })
    setError('')
  }

  const updateEditField = (event) => {
    setEditForm((currentForm) => ({ ...currentForm, [event.target.name]: event.target.value }))
  }

  const saveProduct = async (product) => {
    try {
      const response = await fetch(`/api/products/${getProductKey(product)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editForm,
          name: editForm.title,
          colors: editForm.colors.split(',').map((item) => item.trim()).filter(Boolean),
          sizes: editForm.sizes.split(',').map((item) => item.trim()).filter(Boolean),
        }),
      })
      const updatedProduct = await response.json()
      if (!response.ok) throw new Error(updatedProduct.message || 'Could not update product')
      setProducts((currentProducts) => currentProducts.map((item) => getProductKey(item) === getProductKey(product) ? updatedProduct : item))
      setEditingId(null)
      setEditForm(null)
    } catch (saveError) {
      setError(saveError.message)
    }
  }

  const toggleStock = async (product) => {
    try {
      const response = await fetch(`/api/products/${getProductKey(product)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock: !product.inStock }),
      })
      const updatedProduct = await response.json()
      if (!response.ok) throw new Error(updatedProduct.message || 'Could not update stock')
      setProducts((currentProducts) => currentProducts.map((item) => getProductKey(item) === getProductKey(product) ? updatedProduct : item))
    } catch (stockError) {
      setError(stockError.message)
    }
  }

  const deleteProduct = async (product) => {
    try {
      const response = await fetch(`/api/products/${getProductKey(product)}`, { method: 'DELETE' })
      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.message || 'Could not delete product')
      }
      setProducts((currentProducts) => currentProducts.filter((item) => getProductKey(item) !== getProductKey(product)))
    } catch (deleteError) {
      setError(deleteError.message)
    }
  }

  if (!isAuthenticated) return null

  return (
    <main style={{ padding: '56px 6vw', minHeight: '60vh', background: '#f7f8fc' }}>
      <h1 style={{ color: '#111936', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>Products</h1>
      <p style={{ marginTop: '10px', color: '#667085' }}>Edit, remove, or update product stock in MongoDB.</p>
      {error && <p role="alert" style={{ marginTop: '20px', color: '#b42318' }}>{error}</p>}
      {isLoading ? <p style={{ marginTop: '28px', color: '#667085' }}>Loading products...</p> : (
        <section style={{ marginTop: '28px', padding: '20px', overflowX: 'auto', borderRadius: '18px', background: '#fff', border: '1px solid #e5e7eb', boxShadow: '0 12px 28px rgba(17, 25, 54, 0.06)' }}>
          <table style={{ width: '100%', minWidth: '980px', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                {['Product', 'Category', 'Price', 'Stock', 'Actions'].map((heading) => <th key={heading} style={{ padding: '14px 12px', color: '#667085', fontSize: '12px', textTransform: 'uppercase' }}>{heading}</th>)}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const isEditing = editingId === getProductKey(product)
                return (
                  <tr key={getProductKey(product)} style={{ borderBottom: '1px solid #f0f2f5' }}>
                    <td style={{ padding: '14px 12px', color: '#111936', fontWeight: 700 }}>{isEditing ? <input name="title" value={editForm.title} onChange={updateEditField} style={{ padding: '9px', color: '#fff', background: '#111936', border: '1px solid #344054', borderRadius: '7px' }} /> : (product.title || product.name)}</td>
                    <td style={{ padding: '14px 12px' }}>{isEditing ? <select name="category" value={editForm.category} onChange={updateEditField} style={{ padding: '9px', color: '#fff', background: '#111936', border: '1px solid #344054', borderRadius: '7px' }}>{categories.map((category) => <option key={category}>{category}</option>)}</select> : <span style={{ color: '#667085' }}>{product.category}</span>}</td>
                    <td style={{ padding: '14px 12px' }}>{isEditing ? <input name="price" type="number" value={editForm.price} onChange={updateEditField} style={{ width: '100px', padding: '9px', color: '#fff', background: '#111936', border: '1px solid #344054', borderRadius: '7px' }} /> : <span style={{ color: '#111936', fontWeight: 600 }}>${Number(product.price || 0).toLocaleString()}</span>}</td>
                    <td style={{ padding: '14px 12px' }}><button type="button" onClick={() => toggleStock(product)} style={{ padding: '6px 10px', border: 0, borderRadius: '999px', color: product.inStock ? '#047857' : '#b42318', background: product.inStock ? '#ecfdf3' : '#fef3f2', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>{product.inStock ? 'In Stock' : 'Out of Stock'}</button></td>
                    <td style={{ padding: '14px 12px', whiteSpace: 'nowrap' }}>{isEditing ? <><button type="button" onClick={() => saveProduct(product)} style={{ marginRight: '8px', padding: '8px 12px', border: 0, borderRadius: '7px', color: '#fff', background: '#111936', cursor: 'pointer' }}>Save</button><button type="button" onClick={() => setEditingId(null)} style={{ padding: '8px 12px', border: '1px solid #d0d5dd', borderRadius: '7px', color: '#344054', background: '#fff', cursor: 'pointer' }}>Cancel</button></> : <><button type="button" onClick={() => startEditing(product)} style={{ marginRight: '8px', padding: '8px 12px', border: '1px solid #2563eb', borderRadius: '7px', color: '#2563eb', background: '#eff6ff', cursor: 'pointer' }}>Edit</button><button type="button" onClick={() => deleteProduct(product)} style={{ padding: '8px 12px', border: '1px solid #ef4444', borderRadius: '7px', color: '#b42318', background: '#fff', cursor: 'pointer' }}>Delete</button></>}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {!products.length && <p style={{ padding: '24px 12px', color: '#667085' }}>No products found.</p>}
        </section>
      )}
    </main>
  )
}

export default ProductManagementPage
