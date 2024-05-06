export const getStorageCartItems = (): string[] => {
  return JSON.parse(localStorage.getItem('cart') || '[]')
}
