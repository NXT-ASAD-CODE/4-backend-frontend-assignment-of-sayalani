export const products = [
  {
    id: 't-shirt-tape-details',
    name: 'T-shirt with Tape Details',
    price: 120,
    image: '/image%207.png',
    category: 'New Arrivals',
    description: 'A modern everyday staple with clean detailing and a comfortable fit for daily wear.'
  },
  {
    id: 'skinny-fit-jeans',
    name: 'Skinny Fit Jeans',
    price: 240,
    image: '/image%208.png',
    category: 'New Arrivals',
    description: 'Tailored denim with a sharp silhouette and soft stretch for all-day comfort.'
  },
  {
    id: 'checkered-shirt',
    name: 'Checkered Shirt',
    price: 180,
    image: '/image%209.png',
    category: 'New Arrivals',
    description: 'A classic checked shirt that adds texture and personality to any outfit.'
  },
  {
    id: 'striped-t-shirt',
    name: 'Sleeve Striped T-shirt',
    price: 130,
    image: '/image%2010.png',
    category: 'New Arrivals',
    description: 'Lightweight and easy to style, designed with clean stripes and a relaxed feel.'
  },
  {
    id: 'vertical-striped-shirt',
    name: 'Vertical Striped Shirt',
    price: 212,
    image: '/image%207%20(1).png',
    category: 'Top Selling',
    description: 'A refined striped design that brings structure and statement energy to your looks.'
  },
  {
    id: 'courage-graphic-t-shirt',
    name: 'Courage Graphic T-shirt',
    price: 145,
    image: '/image%208%20(1).png',
    category: 'Top Selling',
    description: 'Urban-inspired graphics paired with a soft fit for everyday confidence.'
  },
  {
    id: 'bermuda-shorts',
    name: 'Loose Fit Bermuda Shorts',
    price: 80,
    image: '/image%209%20(1).png',
    category: 'Top Selling',
    description: 'Relaxed summer shorts with a tailored finish for easy-going comfort.'
  },
  {
    id: 'faded-skinny-jeans',
    name: 'Faded Skinny Jeans',
    price: 210,
    image: '/image%2010%20(1).png',
    category: 'Top Selling',
    description: 'A faded denim look with a sleek fit that pairs effortlessly with layering.'
  },
  {
    id: 'polo-with-contrast-trims',
    name: 'Polo With Contrast Trims',
    price: 212,
    image: '/image%207%20(2).png',
    category: 'You Might Also Like',
    description: 'A polished polo with contrast trims and a premium finish for elevated everyday styling.'
  },
  {
    id: 'gradient-graphic-t-shirt',
    name: 'Gradient Graphic T-shirt',
    price: 145,
    image: '/image%208%20(2).png',
    category: 'You Might Also Like',
    description: 'Bold gradient artwork brings energy to this soft cotton tee with a relaxed, street-ready fit.'
  },
  {
    id: 'polo-with-tipping-details',
    name: 'Polo With Tipping Details',
    price: 180,
    image: '/image%209%20(2).png',
    category: 'You Might Also Like',
    description: 'Clean collar lines and subtle tipping details make this polo versatile from casual to smart-casual.'
  },
  {
    id: 'black-stripted-t-shirt',
    name: 'Black Stripted T-shirt',
    price: 212,
    image: '/image%2010%20(2).png',
    category: 'You Might Also Like',
    description: 'Minimal black stripes create a sleek, modern look while the soft fabric keeps it easy to wear daily.'
  }
  
]

export const getProductById = (id) => products.find((product) => product.id === id)
