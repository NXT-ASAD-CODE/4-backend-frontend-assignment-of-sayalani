import React from 'react'
import AlertBar from './components/AlertBar'
import PrimarySearchAppBar from './components/Navbar'
import LandingPage from './components/LandingPage'
import Slider from './components/Slider'
import NewArrivalsHeading from './components/NewArrivalsHeading'

function App() {
  return (
    <div>
      <AlertBar/>
      <PrimarySearchAppBar/> 
      <LandingPage/>
      <Slider/>
      <NewArrivalsHeading/>
    </div>
  )
}

export default App;