import React from 'react'
import { Link } from 'react-router-dom'

function DynamicButton({ btntext }) {
  return (
    <div className='DynamicButton'>
        <Link to="/category">{btntext}</Link>
    </div>
  )
}

export default DynamicButton