import { Category } from '../types'
import axios from './axios'

const fields = ['id', 'name', 'thumbnailUrl']
const responseFields = `count,items(${fields.join()})`

export const getCategories = async (parentId = '0') => {
  const { data } = await axios.get<{ items: Category[] }>('/categories', {
    params: {
      parentCategoryId: parentId,
      responseFields,
    },
  })
  return data.items
}
