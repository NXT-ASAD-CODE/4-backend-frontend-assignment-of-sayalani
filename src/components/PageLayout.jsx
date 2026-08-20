import React from 'react'
import AlertBar from './AlertBar'
import PrimarySearchAppBar from './Navbar'
import LatestOffers from './LatestOffers'
import Footer from './Footer'

function PageLayout({ children }) {
  return (
    <>
      <AlertBar />
      <PrimarySearchAppBar />
      {children}
      <LatestOffers />
      <Footer />
    </>
  )
}

export default PageLayout
