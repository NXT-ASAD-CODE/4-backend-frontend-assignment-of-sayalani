import React from 'react'

function DynamicProducts({src,cardtext,money}) {
  return (
    <div className='Dynamic-Products'>
        <div className="card1">
            <img src={src} alt="" />
            <p className='card-text'>{cardtext}</p>
            <p className="card-rating">⭐⭐⭐⭐ &nbsp; 4/5</p>
            <p className='card-money'>{money}</p>
        </div>
    </div>
  )
}

export default DynamicProducts