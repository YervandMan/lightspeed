<template>
  <div class="item">
    <div @click="goToProduct">
      <img :src="item.thumbnailUrl" :alt="item.name" />
      <div>
        <h4>{{ item.defaultDisplayedPriceFormatted }}</h4>
        <p>{{ item.name }}</p>
      </div>
    </div>
    <div v-if="!isInCart">
      <button
        type="button"
        class="btn btn-block"
        @click="addToCart(String(item.id))"
      >
        buy now
      </button>
    </div>
    <div v-else>
      <button type="button" class="btn btn-block" @click="placeOrder">
        Place order
      </button>
      <button
        type="button"
        class="btn btn-hipster btn-block"
        @click="removeFromCart(item.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ProductEntry } from '../types'
import { useProductsStore } from '../store/products.ts'
import { toRefs, unref } from 'vue'

const props = defineProps<{
  item: ProductEntry
  isInCart?: boolean
}>()
const emit = defineEmits(['placeOrder'])

const { isInCart, item } = toRefs(props)
const productsStore = useProductsStore()

const { addToCart, removeFromCart } = productsStore

const router = useRouter()

const goToProduct = () => {
  router.push({ name: 'Product', params: { id: unref(item).id } })
}

const placeOrder = () => {
  emit('placeOrder', unref(item))
}
</script>

<style scoped>
.item {
  word-break: break-word;
  font-size: 1rem;
  border-radius: var(--borderRadius);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 12rem;
  height: 100%;
  background-color: var(--white);
  box-shadow: var(--shadow-1);
  padding: 1rem;
  margin: 0 auto;
  cursor: pointer;
}

img {
  width: 13rem;
  height: 13rem;
  border-radius: var(--borderRadius);
  object-fit: cover;
}
.btn-hipster {
  margin-top: 0.25rem;
}

@media screen and (min-width: 768px) {
  .item {
    min-width: initial;
  }
}
</style>
