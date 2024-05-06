<template>
  <h4>Catalog</h4>
  <div class="container">
    <CategoryList />
    <ProductList />
  </div>
</template>

<script setup lang="ts">
import CategoryList from '../components/CategoryList.vue'
import ProductList from '../components/ProductList.vue'
</script>

<style scoped>
h4 {
  text-align: center;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

@media screen and (min-width: 768px) {
  .container {
    flex-direction: row;
    align-items: start;
  }
}
</style>
