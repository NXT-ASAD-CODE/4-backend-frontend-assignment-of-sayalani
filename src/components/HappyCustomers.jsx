import React from 'react'

const reviews = [
  { name: 'Sarah M.', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque aliquid quas explicabo eum ab a iste delectus labore, sint hic?' },
  { name: 'Alex K.', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque aliquid quas explicabo eum ab a iste delectus labore, sint hic?' },
  { name: 'James L.', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque aliquid quas explicabo eum ab a iste delectus labore, sint hic?' },
  { name: 'Ali M.', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque aliquid quas explicabo eum ab a iste delectus labore, sint hic?' },
]

function HappyCustomers() {
  return (
    <div className='Happy-Customers-Section'>
      <div className="HappyCustomersHeading">
        <h1>OUR HAPPY CUSTOMERS</h1>
      </div>
      <div className="HappyCustomersReviews">
        <div className="reviews-track">
          {[...reviews, ...reviews].map((r, i) => (
            <div className="review1" key={i}>
              <p>⭐⭐⭐⭐⭐</p>
              <h2>{r.name} ✔️</h2>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HappyCustomers