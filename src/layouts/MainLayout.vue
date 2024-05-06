<template>
  <div class="layout">
    <header>
      <nav class="navbar">
        <RouterLink to="/"><i>Lightspeed</i></RouterLink>
      </nav>
      <div>
        <RouterLink to="/shopping-cart" class="cart">
          <img :src="cartSVG" alt="cart" />
          <span>{{ cartIds.length }}</span>
        </RouterLink>
      </div>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import cartSVG from '../assets/cart-icon.svg?url'
import { useProductsStore } from '../store/products.ts'
import { storeToRefs } from 'pinia'

const productsStore = useProductsStore()
const { cartIds } = storeToRefs(productsStore)
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 1rem;
  box-shadow: var(--shadow-1);
}
.layout {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 8px 8px;
}
.cart {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: var(--borderRadius);
}
.cart:hover {
  box-shadow: var(--shadow-1);
}
.cart img {
  width: 30px;
}
.cart span {
  position: absolute;
  opacity: 0.9;
  font-weight: bold;
  background-color: var(--primary-200);
  width: 25px;
  height: 25px;
  top: -4px;
  right: -4px;
  line-height: 25px;
  font-size: 14px;
  text-align: center;
  border-radius: 50%;
}
</style>
