import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import ShoppingCart from '../views/ShoppingCart.vue'
import Catalog from '../views/Catalog.vue'
import ProductDetails from '../views/ProductDetails.vue'

const routes: RouteRecordRaw[] = [
  { path: '/products/:id', name: 'Product', component: ProductDetails },
  { path: '/', name: 'Catalog', component: Catalog },
  { path: '/category/:id', name: 'Category', component: Catalog },
  { path: '/shopping-cart', name: 'ShoppingCard', component: ShoppingCart },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
