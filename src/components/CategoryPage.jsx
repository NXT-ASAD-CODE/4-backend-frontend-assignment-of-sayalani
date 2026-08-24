import React, { useEffect, useState } from 'react'
import { getProducts } from '../api/products'
import DynamicProducts from './DynamicProducts'

function CategoryPage() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [products, setProducts] = useState([])

  useEffect(() => {
    const categoriesList = ['All', 'New Arrivals', 'Top Selling', 'Women', 'Men', 'Accessories']
    setCategories(categoriesList)
  }, [])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const categoryQuery = selectedCategory === 'All' ? '' : selectedCategory
        const result = await getProducts(categoryQuery)
        setProducts(result)
      } catch (error) {
        setProducts([])
      }
    }

    loadProducts()
  }, [selectedCategory])

  return (
    <div className="product-page" style={{ paddingTop: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '20px', color: '#111' }}>Categories</h2>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '30px' }}>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              style={{
                border: selectedCategory === category ? '1px solid #111' : '1px solid #ddd',
                background: selectedCategory === category ? '#111' : '#fff',
                color: selectedCategory === category ? '#fff' : '#111',
                padding: '10px 18px',
                borderRadius: '999px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex">
          {products.length > 0 ? (
            products.map((product) => (
              <DynamicProducts
                key={product.id}
                id={product.id}
                src={product.image}
                cardtext={product.name}
                money={`RS : $${product.price}`}
              />
            ))
          ) : (
            <p style={{ color: '#666' }}>No products found for this category.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
