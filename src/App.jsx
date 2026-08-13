import React from 'react'
import AlertBar from './components/AlertBar'
import PrimarySearchAppBar from './components/Navbar'
import LandingPage from './components/LandingPage'

function App() {
  return (
    <div>
      <AlertBar/>
      <PrimarySearchAppBar/> 
      <LandingPage/>
    </div>
  )
}

export default App