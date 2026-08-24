import React from 'react'

function Heading({ title, id }) {
  return (
    <div className='Heading-props' id={id}>
        <h1>{title}</h1>
    </div>
  )
}

export default Heading;