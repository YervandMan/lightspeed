<template>
  <section>
    <div v-if="isLoading" class="loading"></div>
    <div v-else-if="error">
      <h2>Oops! Failed to fetch product details</h2>
      <p>{{ error.message }}</p>
    </div>
    <div v-else-if="currentItem">
      <h2>{{ currentItem.name }}</h2>
      <img :src="currentItem.thumbnailUrl" :alt="currentItem.name" />
      <p>Price: {{ currentItem.defaultDisplayedPriceFormatted }}</p>
      <h5>Description</h5>
      <div v-html="currentItem.description"></div>
      <button
        type="button"
        class="btn btn-block"
        @click="addToCart(String(currentItem.id))"
      >
        Buy
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '../store/products.ts'
import { storeToRefs } from 'pinia'

const route = useRoute()
const productsStore = useProductsStore()
const { addToCart, getProduct } = productsStore
const { isLoading, error, currentItem } = storeToRefs(productsStore)

watch(
  () => route.params.id,
  () => {
    getProduct(route.params.id as string)
  },
  {
    immediate: true,
  }
)
</script>

<style scoped>
section {
  padding: 0.5rem;
}
img {
  width: 18rem;
  height: 18rem;
  border-radius: 5px;
  box-shadow: var(--shadow-2);
  object-fit: cover;
}
.btn-block {
  display: block;
  width: 30%;
  margin: 0 auto;
}
@media screen and (min-width: 768px) {
  img {
    width: 31rem;
    height: 31rem;
  }
}
</style>
