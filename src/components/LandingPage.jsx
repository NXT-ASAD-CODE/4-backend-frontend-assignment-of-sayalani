import React from 'react'

function LandingPage() {
    const handleShopNow = () => {
        const section = document.getElementById('new-arrivals')
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <div className='LandingPage'>
            <div className='Text-Section'>
                <div className="Heading">
                    <h1>FIND CLOTHES <br />  THAT MATCHES <br />  YOUR STYLE</h1>
                </div>
                <div className="Paragraph">
                    <p>Browse through our diverse range of meticulously crafted garments, designed <br /> to bring out your individuality and cater to your sense of style.</p>
                </div>
                <div className="ShopNow-btn">
                    <button type="button" onClick={handleShopNow}>Shop Now</button>
                </div>
                <div className="stats-bar">
                    <div className="stat">
                        <div className="stat-number">200+</div>
                        <div className="stat-label">International Brands</div>
                    </div>
                    <div className="stat">
                        <div className="stat-number">2000+</div>
                        <div className="stat-label">High-Quality Products</div>
                    </div>
                    <div className="stat">
                        <div className="stat-number">30000+</div>
                        <div className="stat-label">Happy Customers</div>
                    </div>
                </div>
            </div>
            <div className='Image-Section'>
                <div className="person-image">
                    <img src="./Rectangle 2 (1).png" alt="Fashion model" />
                </div>
                <div className="vector1-image">
                    <img src="./Vector.png" alt="" />
                </div>
                <div className="vector2-image">
                    <img src="./Vector (1).png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default LandingPage;