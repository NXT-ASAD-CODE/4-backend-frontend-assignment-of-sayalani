import React from 'react'

function BrowseStyle() {
    return (
        <div className='flex'>
            <div className="panel">
                <h1>Browse by Dress Style</h1>
                <div className="style-grid">
                    <div className="style-card card-casual">
                        <p className='Image-Text'>asad</p>
                        <img src="../public/image 11.png" alt="Casual style" />
                    </div>
                    <div className="style-card card-formal">
                        <img src="../public/image 13.png" alt="Formal style" />
                    </div>
                    <div className="style-card card-party">
                        <img src="../public/image 12.png" alt="Party style" />
                    </div>
                    <div className="style-card card-gym">
                        <img src="../public/image 14.png" alt="Gym style" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrowseStyle;