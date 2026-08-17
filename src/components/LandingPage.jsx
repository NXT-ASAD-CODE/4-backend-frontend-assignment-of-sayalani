import React from 'react'

function LandingPage() {
    return (
        <div className='LandingPage'>
            <div className='Text-Section'>
                <div className="Heading">
                    <h1>FIND CLOTHES <br /> <br /> THAT MATCHES <br /> <br /> YOUR STYLE</h1>
                </div>
                <div className="Paragraph">
                    <p>Browse through our diverse range of meticulously crafted garments, designed <br /> to bring out your individuality and cater to your sense of style.</p>
                </div>
                <div className="ShopNow-btn">
                    <a href="">Shop Now</a>
                </div>
                <div class="stats-bar">
                    <div class="stat">
                        <div class="stat-number">200+</div>
                        <div class="stat-label">International Brands</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number">2000+</div>
                        <div class="stat-label">High-Quality Products</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number">30000+</div>
                        <div class="stat-label">Happy Customers</div>
                    </div>
                </div>
            </div>
            <div className='Image-Section'>
                <div className="person-image">
                    {/* <img src="../public/Rectangle 2.png" alt="" /> */}
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

export default LandingPage