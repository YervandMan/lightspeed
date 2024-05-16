import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
  batchGetProducts,
  getByCategory,
  getProductById,
  getProducts,
} from '../services/product.service'
import { ProductEntry } from '../types'
import { getStorageCartItems } from '../utils'

export const useProductsStore = defineStore('productsStore', () => {
  const isLoading = ref(true)
  const error = ref<Error | null>(null)
  const items = ref<ProductEntry[]>([])
  const currentItem = ref<ProductEntry | null>(null)
  const cartIds = ref<string[]>(getStorageCartItems())
  const cartItems = ref<ProductEntry[]>([])

  const setLoading = (value: boolean) => {
    isLoading.value = value
  }

  const setError = (data: Error) => {
    error.value = data
  }

  const getAllProducts = () =>
    new Promise((resolve, reject) => {
      setLoading(true)
      getProducts()
        .then((response) => {
          items.value = response
          resolve(response)
        })
        .catch((errorData) => {
          setError(errorData)
          reject(error)
        })
        .finally(() => {
          setLoading(false)
        })
    })

  const getProductsByCategory = (id: string) =>
    new Promise((resolve, reject) => {
      setLoading(true)
      getByCategory(id)
        .then((response) => {
          items.value = response
          resolve(response)
        })
        .catch((errorData) => {
          setError(errorData)
          reject(error)
        })
        .finally(() => {
          setLoading(false)
        })
    })

  const getProduct = (id: string) =>
    new Promise((resolve, reject) => {
      setLoading(true)
      getProductById(id)
        .then((response) => {
          currentItem.value = response
          resolve(response)
        })
        .catch((errorData) => {
          setError(errorData)
          reject(error)
        })
        .finally(() => {
          setLoading(false)
        })
    })
  const getCartItems = () =>
    new Promise((resolve, reject) => {
      setLoading(true)
      batchGetProducts(cartIds.value)
        .then((response) => {
          cartItems.value = response
          resolve(response)
        })
        .catch((errorData) => {
          setError(errorData)
          reject(error)
        })
        .finally(() => {
          setLoading(false)
        })
    })

  const addToCart = (id: string) => {
    if (cartIds.value.includes(id)) {
      return
    }
    cartIds.value.push(id)
    localStorage.cart = JSON.stringify(cartIds.value)
  }
  const removeFromCart = (id: number) => {
    cartIds.value = cartIds.value.filter((i) => i !== String(id))
    cartItems.value = cartItems.value.filter((item) => item.id !== id)
    localStorage.cart = JSON.stringify(cartIds.value)
  }
  const isItemInCart = (id: string) => cartIds.value.includes(id)

  return {
    isLoading,
    error,
    items,
    currentItem,
    cartIds,
    cartItems,
    getAllProducts,
    getProductsByCategory,
    getProduct,
    getCartItems,
    addToCart,
    removeFromCart,
    isItemInCart,
  }
})
