const normalizeBaseUrl = (value = '') => value.replace(/\/+$/, '')
const BASE_URL = import.meta.env.PROD ? '' : normalizeBaseUrl(import.meta.env.VITE_API_URL || '')

export const isProductInStock = (product) => product.inStock !== false

const getApiUrl = (path) => {
  const apiBase = BASE_URL.endsWith('/api') ? BASE_URL : `${BASE_URL}/api`
  return `${apiBase}${path}`
}

export const getProducts = async (category) => {
  const query = category ? `?category=${encodeURIComponent(category)}` : ''
  const res = await fetch(`${getApiUrl('/products')}${query}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  const products = await res.json()
  return products.filter(isProductInStock)
}

export const getProductById = async (id) => {
  try {
    const directRes = await fetch(getApiUrl(`/products/${id}`))

    if (directRes.ok) {
      const product = await directRes.json()
      if (isProductInStock(product)) return product
      throw new Error('Product is out of stock')
    }
  } catch (error) {
    // ignore and fall back to list lookup below
  }

  const listRes = await fetch(getApiUrl('/products'))

  if (!listRes.ok) {
    throw new Error('Product not found')
  }

  const products = await listRes.json()
  const product = products.find((item) => String(item.id) === String(id) && isProductInStock(item))

  if (!product) {
    throw new Error('Product not found')
  }

  return product
}