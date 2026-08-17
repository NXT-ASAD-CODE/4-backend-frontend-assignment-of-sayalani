import React from 'react'

function BrowseStyle() {
    return (
        <div className='flex'>
            <div className="panel">
                <h1 className='panel-heading'>Browse by Dress Style</h1>
                <div className="style-grid">
                    <div className="style-card card-casual">
                        <h1 className='Image-Text'>Casual</h1>        
                        <img src="../public/image 11.png" alt="Casual style" />
                    </div>
                    <div className="style-card card-formal">
                        <h1 className='Image-Text'>Formal</h1> 
                        <img src="../public/image 13.png" alt="Formal style" />
                    </div>
                    <div className="style-card card-party">
                        <h1 className='Image-Text'>Party</h1> 
                        <img src="../public/image 12.png" alt="Party style" />
                    </div>
                    <div className="style-card card-gym">
                        <h1 className='Image-Text'>Gym</h1> 
                        <img src="../public/image 14.png" alt="Gym style" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrowseStyle;