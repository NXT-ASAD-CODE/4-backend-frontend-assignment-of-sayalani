import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Heading from './NewArrivalsHeading.jsx'
import DynamicProducts from './DynamicProducts.jsx'
import { getProductById, getProducts } from '../api/products'

const colorOptions = [
  { name: 'Black', value: '#111111' },
  { name: 'Gray', value: '#a8a8a8' },
  { name: 'Sand', value: '#d8c4a1' }
]

function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].name)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [id])

  useEffect(() => {
    getProductById(id)
      .then((data) => setProduct(data))
      .catch(() => setProduct(null))

    getProducts('You Might Also Like')
      .then((data) => setRelatedProducts(data))
      .catch((error) => console.error('Failed to load related products:', error))
  }, [id])

  if (!product) {
    return (
      <div className="product-page-empty">
        <h2>Product not found</h2>
        <Link to="/" className="back-home-btn">Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="product-page">
      <div className="product-page-inner">
        <div className="product-image-panel">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-details">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="product-price">RS : ${product.price}</p>
          <p className="product-description">{product.description}</p>

          <hr className="product-divider" />

          <div className="color-selector">
            <p className="color-label">Select Color</p>
            <div className="color-options">
              {colorOptions.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  className={`color-option ${selectedColor === color.name ? 'selected' : ''}`}
                  onClick={() => setSelectedColor(color.name)}
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                  style={{ backgroundColor: color.value }}
                >
                  {selectedColor === color.name && <span className="color-check">✓</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="product-actions">
            <button className="add-to-cart-btn">Add to Cart</button>
            <Link to="/" className="back-home-btn">Continue Shopping</Link>
          </div>
        </div>
      </div>
      <Heading title={"YOU MIGHT ALSO LIKE"} />
      <div className="flex">
        {relatedProducts.map((product) => (
          <DynamicProducts
            key={product.id}
            id={product.id}
            src={product.image}
            cardtext={product.name}
            money={`RS : $${product.price}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductPage
