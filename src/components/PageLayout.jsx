import React from 'react'
import AlertBar from './AlertBar'
import PrimarySearchAppBar from './Navbar'
import LatestOffers from './LatestOffers'
import Footer from './Footer'

function PageLayout({ children, cartCount = 0 }) {
  return (
    <>
      <AlertBar />
      <PrimarySearchAppBar cartCount={cartCount} />
      {children}
      <LatestOffers />
      <Footer />
    </>
  )
}

export default PageLayout
