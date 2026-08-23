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
import { getProducts } from './api/products'

function HomePage() {
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
    <PageLayout>
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
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/product/:id"
        element={
          <PageLayout>
            <ProductPage />
          </PageLayout>
        }
      />
    </Routes>
  )
}

export default App;