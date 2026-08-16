import React from 'react'
import AlertBar from './components/AlertBar'
import PrimarySearchAppBar from './components/Navbar'
import LandingPage from './components/LandingPage'
import Slider from './components/Slider'
import Heading from './components/NewArrivalsHeading'
import DynamicProducts from './components/DynamicProducts'
import DynamicButton from './components/DynamicButton'
import HorizontalLine from './components/HorizontalLine'

function App() {
  return (
    <div>
      <AlertBar />
      <PrimarySearchAppBar />
      <LandingPage />
      <Slider />
      <Heading title={"New Arrivals"} />
      <div className="flex">
        <DynamicProducts src={"../public/image 7.png"} cardtext={"T-shirt with Tape Details"} money={"RS : $120"} />
        <DynamicProducts src={"../public/image 8.png"} cardtext={"Skinny Fit Jeans"} money={"RS : $240"} />
        <DynamicProducts src={"../public/image 9.png"} cardtext={"Checkered Shirt"} money={"RS : $180"} />
        <DynamicProducts src={"../public/image 10.png"} cardtext={"Sleeve Striped T-shirt"} money={"RS : $130"} />
      </div>
      <DynamicButton btntext={"View All"} />
      <HorizontalLine />
      <Heading title={"Top Selling"} />
      <div className="flex">
        <DynamicProducts src={"../public/image 7 (1).png"} cardtext={"Vertical Striped Shirt"} money={"RS : $212"} />
        <DynamicProducts src={"../public/image 8 (1).png"} cardtext={"Courage Graphic T-shirt"} money={"RS : $145"} />
        <DynamicProducts src={"../public/image 9 (1).png"} cardtext={"Loose Fit Bermuda Shorts"} money={"RS : $80"} />
        <DynamicProducts src={"../public/image 10 (1).png"} cardtext={"Faded Skinny Jeans"} money={"RS : $210"} />
      </div>
      <DynamicButton btntext={"View All"} />
    </div>
  )
}

export default App;