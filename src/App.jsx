import React from 'react'
import AlertBar from './components/AlertBar'
import PrimarySearchAppBar from './components/Navbar'
import LandingPage from './components/LandingPage'
import Slider from './components/Slider'

function App() {
  return (
    <div>
      <AlertBar/>
      <PrimarySearchAppBar/> 
      <LandingPage/>
      <Slider/>
    </div>
  )
}

export default App