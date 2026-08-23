const normalizeBaseUrl = (value = '') => value.replace(/\/+$/, '')
const BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_URL || '')

const getApiUrl = (path) => {
  const apiBase = BASE_URL.endsWith('/api') ? BASE_URL : `${BASE_URL}/api`
  return `${apiBase}${path}`
}

export const getProducts = async (category) => {
  const query = category ? `?category=${encodeURIComponent(category)}` : ''
  const res = await fetch(`${getApiUrl('/products')}${query}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export const getProductById = async (id) => {
  try {
    const directRes = await fetch(getApiUrl(`/products/${id}`))

    if (directRes.ok) {
      return directRes.json()
    }
  } catch (error) {
    // ignore and fall back to list lookup below
  }

  const listRes = await fetch(getApiUrl('/products'))

  if (!listRes.ok) {
    throw new Error('Product not found')
  }

  const products = await listRes.json()
  const product = products.find((item) => String(item.id) === String(id))

  if (!product) {
    throw new Error('Product not found')
  }

  return product
}