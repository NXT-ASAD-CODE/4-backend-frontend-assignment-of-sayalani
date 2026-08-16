import React from 'react'
import AlertBar from './components/AlertBar'
import PrimarySearchAppBar from './components/Navbar'
import LandingPage from './components/LandingPage'
import Slider from './components/Slider'
import Heading from './components/NewArrivalsHeading'
import DynamicProducts from './components/DynamicProducts'
import DynamicButton from './components/DynamicButton'

function App() {
  return (
    <div>
      <AlertBar/>
      <PrimarySearchAppBar/> 
      <LandingPage/>
      <Slider/>
      <Heading title={"New Arrivals"}/>
      <div className="flex">
      <DynamicProducts src={"../public/image 7.png"} cardtext={"T-shirt with Tape Details"} money={"RS : $120"}/>
      <DynamicProducts src={"../public/image 8.png"} cardtext={"Skinny Fit Jeans"} money={"RS : $240"}/>
      <DynamicProducts src={"../public/image 9.png"} cardtext={"Checkered Shirt"} money={"RS : $180"}/>
      <DynamicProducts src={"../public/image 10.png"} cardtext={"Sleeve Striped T-shirt"} money={"RS : $130"}/>
      </div>
      <DynamicButton btntext={"View All"}/>
    </div>
  )
}

export default App;