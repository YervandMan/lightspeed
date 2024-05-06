import { ProductEntry } from '../types'
import axios from './axios'

const FIELDS = [
  'id',
  'imageUrl',
  'thumbnailUrl',
  'defaultDisplayedPriceFormatted',
  'name',
]
const ITEM_FIELDS = [
  'id',
  'name',
  'description',
  'thumbnailUrl',
  'defaultDisplayedPriceFormatted',
  'imageUrl',
]
const responseFields = `count,items(${FIELDS.join()})`

export const getProducts = async (): Promise<ProductEntry[]> => {
  const { data } = await axios.get('/products')
  return data.items
}

export const getByCategory = async (id: string) => {
  const { data } = await axios.get<{ items: ProductEntry[] }>('/products', {
    params: {
      includeProductsFromSubcategories: 'true',
      categories: id,
      responseFields,
    },
  })
  return data.items
}

export const batchGetProducts = async (ids: string[]) => {
  if (ids.length === 0) {
    return []
  }
  const { data } = await axios.get<{ items: ProductEntry[] }>('/products', {
    params: {
      productId: ids.join(','),
      responseFields,
    },
  })
  return data.items
}

export const getProductById = async (id: number | string) => {
  const { data } = await axios.get<ProductEntry>(`/products/${id}`, {
    params: {
      responseFields: ITEM_FIELDS.join(),
    },
  })
  return data
}
