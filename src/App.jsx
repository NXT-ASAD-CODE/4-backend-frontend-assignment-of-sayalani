import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import PageLayout from './components/PageLayout'
import LandingPage from './components/LandingPage'
import Slider from './components/Slider'
import Heading from './components/NewArrivalsHeading'
import DynamicProducts from './components/DynamicProducts'
import DynamicButton from './components/DynamicButton'
import HorizontalLine from './components/HorizontalLine'
import BrowseStyle from './components/BrowseStyle'
import HappyCustomers from './components/HappyCustomers'
import ProductPage from './components/ProductPage'
import CartPage from './components/CartPage'
import { getProducts } from './api/products'

const getStoredCart = () => {
  if (typeof window === 'undefined') return []

  try {
    const savedCart = JSON.parse(localStorage.getItem('cartItems'))
    return Array.isArray(savedCart) ? savedCart : []
  } catch (error) {
    return []
  }
}

function HomePage({ cartCount }) {
  const [newArrivals, setNewArrivals] = useState([])
  const [topSelling, setTopSelling] = useState([])

  useEffect(() => {
    Promise.all([
      getProducts('New Arrivals'),
      getProducts('Top Selling')
    ])
      .then(([newItems, topItems]) => {
        setNewArrivals(newItems)
        setTopSelling(topItems)
      })
      .catch((error) => console.error('Failed to load products:', error))
  }, [])

  return (
    <PageLayout cartCount={cartCount}>
      <LandingPage />
      <Slider />
      <Heading title={"New Arrivals"} />
      <div className="flex">
        {newArrivals.slice(0, 4).map((product) => (
          <DynamicProducts
            key={product.id}
            id={product.id}
            src={product.image}
            cardtext={product.name}
            money={`RS : $${product.price}`}
          />
        ))}
      </div>
      <DynamicButton btntext={"View All"} />
      <HorizontalLine />
      <Heading title={"Top Selling"} />
      <div className="flex">
        {topSelling.map((product) => (
          <DynamicProducts
            key={product.id}
            id={product.id}
            src={product.image}
            cardtext={product.name}
            money={`RS : $${product.price}`}
          />
        ))}
      </div>
      <DynamicButton btntext={"View All"} />
      <BrowseStyle/>
      <HappyCustomers/>
    </PageLayout>
  )
}

function App() {
  const [cartItems, setCartItems] = useState(getStoredCart)

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const cartCount = cartItems.reduce((count, item) => count + Number(item.quantity || 1), 0)

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemKey = `${product.id}-${product.selectedColor}-${product.selectedSize}`
      const existingItem = prevItems.find(
        (item) => `${item.id}-${item.selectedColor}-${item.selectedSize}` === itemKey
      )

      if (existingItem) {
        return prevItems.map((item) => {
          if (`${item.id}-${item.selectedColor}-${item.selectedSize}` === itemKey) {
            return { ...item, quantity: Number(item.quantity || 1) + Number(product.quantity || 1) }
          }
          return item
        })
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity: Number(product.quantity || 1),
          selectedColor: product.selectedColor || 'Black',
          selectedSize: product.selectedSize || 'Medium'
        }
      ]
    })
  }

  const updateCartQuantity = (productId, selectedColor, selectedSize, nextQuantity) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          const sameItem =
            item.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize

          if (!sameItem) return item

          const updatedQuantity = Math.max(1, nextQuantity)
          return { ...item, quantity: updatedQuantity }
        })
        .filter((item) => item.quantity > 0)
    )
  }

  const removeFromCart = (productId, selectedColor, selectedSize) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item.id === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
      )
    )
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage cartCount={cartCount} />} />
      <Route
        path="/product/:id"
        element={
          <PageLayout cartCount={cartCount}>
            <ProductPage onAddToCart={addToCart} />
          </PageLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <PageLayout cartCount={cartCount}>
            <CartPage
              cartItems={cartItems}
              onUpdateQuantity={updateCartQuantity}
              onRemove={removeFromCart}
            />
          </PageLayout>
        }
      />
    </Routes>
  )
}

export default App;