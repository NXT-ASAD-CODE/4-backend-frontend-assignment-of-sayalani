import React from 'react'
import { Link } from 'react-router-dom'

function DynamicProducts({ id, src, cardtext, money }) {
  return (
    <div className='Dynamic-Products'>
        <Link to={`/product/${id}`} className="card1-link">
          <div className="card1">
              <img src={src} alt={cardtext} />
              <p className='card-text'>{cardtext}</p>
              <p className="card-rating">⭐⭐⭐⭐ &nbsp; 4/5</p>
              <p className='card-money'>{money}</p>
          </div>
        </Link>
    </div>
  )
}

export default DynamicProducts