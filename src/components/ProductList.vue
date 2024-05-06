<template>
  <section>
    <div v-if="isLoading" class="loading"></div>
    <div v-else-if="error">Oops! Failed to load products</div>
    <div v-else class="product-list">
      <Item v-for="item in items" :key="item.id" :item />
    </div>
  </section>
</template>

<script lang="ts" setup>
import Item from './Item.vue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '../store/products.ts'
import { storeToRefs } from 'pinia'

const productsStore = useProductsStore()

const { getProductsByCategory, getAllProducts } = productsStore
const { isLoading, error, items } = storeToRefs(productsStore)

const route = useRoute()

watch(
  () => route.params.id,
  () => {
    route.name === 'Category'
      ? getProductsByCategory(route.params.id as string)
      : getAllProducts()
  },
  { immediate: true }
)
</script>

<style scoped>
section {
  flex: 1;
}
h4 {
  text-align: center;
}
.product-list {
  max-width: 1170px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>
