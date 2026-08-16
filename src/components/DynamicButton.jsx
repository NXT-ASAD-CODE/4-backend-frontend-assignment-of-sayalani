import React from 'react'

function DynamicButton({btntext}) {
  return (
    <div className='DynamicButton'>
        <a href="#">{btntext}</a>
    </div>
  )
}

export default DynamicButton