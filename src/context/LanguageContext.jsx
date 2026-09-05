import React, { createContext, useContext, useState } from 'react'

const translations = {
  English: {
    category: 'Category',
    dashboard: 'Dashboard',
    newArrivals: 'New Arrivals',
    topSelling: 'Top Selling',
    cart: 'Cart',
    profile: 'Profile',
    myAccount: 'My account',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit Fullscreen',
    search: 'Search',
    heroTitle: <>FIND CLOTHES <br /> THAT MATCH YOUR STYLE</>,
    heroDescription: 'Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.',
    shopNow: 'Shop Now',
    internationalBrands: 'International Brands',
    qualityProducts: 'High-Quality Products',
    happyCustomers: 'Happy Customers',
  },
  French: {
    category: 'Catégorie',
    dashboard: 'Tableau de bord',
    newArrivals: 'Nouveautés',
    topSelling: 'Meilleures ventes',
    cart: 'Panier',
    profile: 'Profil',
    myAccount: 'Mon compte',
    fullscreen: 'Plein écran',
    exitFullscreen: 'Quitter le plein écran',
    search: 'Rechercher',
    heroTitle: <>TROUVEZ DES VÊTEMENTS <br /> QUI CORRESPONDENT À VOTRE STYLE</>,
    heroDescription: 'Découvrez notre gamme variée de vêtements soigneusement confectionnés, conçus pour révéler votre individualité et exprimer votre style.',
    shopNow: 'Acheter maintenant',
    internationalBrands: 'Marques internationales',
    qualityProducts: 'Produits de haute qualité',
    happyCustomers: 'Clients satisfaits',
  },
  Romanian: {
    category: 'Categorie',
    dashboard: 'Tablou de bord',
    newArrivals: 'Noutăți',
    topSelling: 'Cele mai vândute',
    cart: 'Coș',
    profile: 'Profil',
    myAccount: 'Contul meu',
    fullscreen: 'Ecran complet',
    exitFullscreen: 'Ieșire din ecran complet',
    search: 'Caută',
    heroTitle: <>GĂSEȘTE HAINE <br /> CARE SE POTRIVESC STILULUI TĂU</>,
    heroDescription: 'Descoperă gama noastră variată de haine atent create, concepute pentru a-ți evidenția individualitatea și stilul.',
    shopNow: 'Cumpără acum',
    internationalBrands: 'Branduri internaționale',
    qualityProducts: 'Produse de înaltă calitate',
    happyCustomers: 'Clienți mulțumiți',
  },
  Chinese: {
    category: '分类',
    dashboard: '仪表板',
    newArrivals: '新品',
    topSelling: '热销商品',
    cart: '购物车',
    profile: '个人资料',
    myAccount: '我的账户',
    fullscreen: '全屏',
    exitFullscreen: '退出全屏',
    search: '搜索',
    heroTitle: <>寻找适合 <br /> 你的风格的服装</>,
    heroDescription: '浏览我们精心制作的多样服装系列，展现你的个性与独特风格。',
    shopNow: '立即购买',
    internationalBrands: '国际品牌',
    qualityProducts: '高品质产品',
    happyCustomers: '满意的客户',
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [selectedLanguage, setSelectedLanguage] = useState(() => (
    localStorage.getItem('selectedLanguage') || 'English'
  ))

  const selectLanguage = (language) => {
    setSelectedLanguage(language)
    localStorage.setItem('selectedLanguage', language)
  }

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        selectLanguage,
        text: translations[selectedLanguage],
        languages: Object.keys(translations),
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
