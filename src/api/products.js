const BASE_URL = import.meta.env.VITE_API_URL

export const getProducts = async (category) => {
  const query = category ? `?category=${encodeURIComponent(category)}` : ''
  const res = await fetch(`${BASE_URL}/products${query}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) throw new Error('Product not found')
  return res.json()
}