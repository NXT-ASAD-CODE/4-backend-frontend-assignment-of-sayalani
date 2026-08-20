import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../data/products.js'
import Heading from './NewArrivalsHeading.jsx'
import DynamicProducts from './DynamicProducts.jsx'
import { products } from '../data/products'

function ProductPage() {
  const { id } = useParams()
  const product = getProductById(id)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
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

          <div className="product-actions">
            <button className="add-to-cart-btn">Add to Cart</button>
            <Link to="/" className="back-home-btn">Continue Shopping</Link>
          </div>
        </div>
      </div>
      <Heading title={"YOU MIGHT ALSO LIKE"} />
            <div className="flex">
        {products.slice(8).map((product) => (
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
