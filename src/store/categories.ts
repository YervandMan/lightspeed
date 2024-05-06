import { defineStore } from 'pinia'
import { Category } from '../types'
import { getCategories } from '../services/category.service'
import { ref } from 'vue'

export const useCategoriesStore = defineStore('categoriesStore', () => {
  const isLoading = ref<boolean>(true)
  const error = ref<Error | null>(null)
  const categories = ref<Category[]>([])

  const setLoading = (value: boolean) => {
    isLoading.value = value
  }

  const getAllCategories = (parentId?: string) =>
    new Promise((resolve, reject) => {
      setLoading(true)
      getCategories(parentId)
        .then((response) => {
          categories.value = response
          resolve(response)
        })
        .catch((errorData) => {
          error.value = errorData
          reject(error)
        })
        .finally(() => {
          setLoading(false)
        })
    })

  return {
    isLoading,
    error,
    categories,
    setLoading,
    getAllCategories,
  }
})
