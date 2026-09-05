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
import CategoryPage from './components/CategoryPage'
import DashboardPage from './components/DashboardPage'
import { LanguageProvider } from './context/LanguageContext'
import { useLanguage } from './context/LanguageContext'
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
  const { text } = useLanguage()
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
      <Heading title={text.newArrivals} id="new-arrivals" />
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
      <Heading title={text.topSelling} id="top-selling" />
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
    <LanguageProvider>
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
      <Route
        path="/category"
        element={
          <PageLayout cartCount={cartCount}>
            <CategoryPage />
          </PageLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PageLayout cartCount={cartCount}>
            <DashboardPage />
          </PageLayout>
        }
      />
      </Routes>
    </LanguageProvider>
  )
}

export default App;