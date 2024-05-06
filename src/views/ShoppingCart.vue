<template>
  <h4>Shopping Cart</h4>
  <div v-if="isLoading" class="loading"></div>
  <div v-else-if="error">
    <h4>Oops! Failed to load cart items</h4>
    <p>{{ error.message }}</p>
  </div>
  <section v-else-if="cartItems.length">
    <div v-for="item in cartItems" :key="item.id">
      <Item :item isInCart @placeOrder="onPlaceOrder" />
    </div>
  </section>
  <div v-else>
    <button class="btn btn-hipster" @click="goToCatalog">go to catalog</button>
  </div>
  <Modal :isOpen="showModal" @close-modal="closeModal">
    <template #header>
      <h4>Congrats!!!</h4>
    </template>
    <template #content>
      <p>{{ itemToBuy?.name }}</p>
      <div v-html="itemToBuy?.description"></div>
    </template>
    <template #footer>
      <button class="btn" @click="closeModal">ok</button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Item from '../components/Item.vue'
import { useRouter } from 'vue-router'
import { ProductEntry } from '../types'
import Modal from '../components/Modal.vue'
import { useProductsStore } from '../store/products.ts'
import { storeToRefs } from 'pinia'

const itemToBuy = ref<ProductEntry | null>(null)
const productsStore = useProductsStore()

const { getCartItems } = productsStore
const { isLoading, error, cartItems } = storeToRefs(productsStore)

const router = useRouter()
const showModal = computed(() => {
  return !!itemToBuy.value
})

onMounted(async () => {
  await getCartItems()
})

const goToCatalog = () => {
  router.push({ name: 'Catalog' })
}
const onPlaceOrder = (item: ProductEntry) => {
  itemToBuy.value = item
}

const closeModal = () => {
  itemToBuy.value = null
}
</script>

<style scoped>
h4 {
  text-align: center;
}
section {
  margin: 2rem auto;
  padding: 0.5rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
