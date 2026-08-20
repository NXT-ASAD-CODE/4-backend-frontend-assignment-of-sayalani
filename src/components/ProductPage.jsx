import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../data/products'

function ProductPage() {
  const { id } = useParams()
  const product = getProductById(id)

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

          <div className="product-actions">
            <button className="add-to-cart-btn">Add to Cart</button>
            <Link to="/" className="back-home-btn">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
