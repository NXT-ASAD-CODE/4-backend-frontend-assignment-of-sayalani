import React from 'react'

function LatestOffers() {
  return (
    <div className='LatestOffersPage'>
        <div className="LatestOffersHeading">
            <h1>STAY UP TO DATE ABOUT <br /> <br /> OUR LATEST OFFERS</h1>
        </div>
        <div className='EmailWithBtn'>
            <div><input type="email" placeholder='Enter Your Email Address' />
            
            </div>
            <div><a href="">Subscribe to Newsletter</a></div>
        </div>
    </div>
  )
}

export default LatestOffers