import React from 'react'
import { useLanguage } from '../context/LanguageContext'

function LandingPage() {
    const { text } = useLanguage()
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
                    <h1>{text.heroTitle}</h1>
                </div>
                <div className="Paragraph">
                    <p>{text.heroDescription}</p>
                </div>
                <div className="ShopNow-btn">
                    <button type="button" onClick={handleShopNow}>{text.shopNow}</button>
                </div>
                <div className="stats-bar">
                    <div className="stat">
                        <div className="stat-number">200+</div>
                        <div className="stat-label">{text.internationalBrands}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-number">2000+</div>
                        <div className="stat-label">{text.qualityProducts}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-number">30000+</div>
                        <div className="stat-label">{text.happyCustomers}</div>
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