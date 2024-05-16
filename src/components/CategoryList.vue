<template>
  <aside>
    <h5>Categories</h5>
    <div v-if="isLoading" class="loading" />
    <div v-else-if="error">Oops! Failed to load categories</div>
    <div
      v-else
      v-for="category in categories"
      :key="category.id"
      class="category-item"
    >
      <RouterLink :to="`/category/${category.id}`" class="link">
        <img :src="category.thumbnailUrl" :alt="category.name" />
        <p>{{ category.name }}</p>
      </RouterLink>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useCategoriesStore } from '../store/categories.ts'
import { storeToRefs } from 'pinia'

const route = useRoute()
const categoriesStore = useCategoriesStore()
const { getAllCategories } = categoriesStore
const { isLoading, error, categories } = storeToRefs(categoriesStore)

watch(
  () => route.params.id,
  async () => {
    await getAllCategories(route.params.id as string)
  },
  { immediate: true }
)
</script>

<style scoped>
aside {
  padding: 0.5rem;
  box-shadow: var(--shadow-2);
  border-radius: var(--borderRadius);
  text-align: center;
  background-color: var(--white);
  font-size: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-inline: 1rem;
}
.category-item {
  max-width: 100%;
}
.loading {
  width: 2rem;
  height: 2rem;
}
.link {
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: var(--shadow-1);
  width: 100%;
  padding: 0 1rem;
  border-radius: var(--borderRadius);
  margin-bottom: 0.25rem;
}
.link:hover {
  background-color: var(--grey-50);
}
.router-link-exact-active {
  background-color: var(--grey-100);
}

p {
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
h5 {
  font-size: 1rem;
  display: none;
}

img {
  width: 20px;
  height: 20px;
  margin: 0.15rem;
  border-radius: var(--borderRadius);
}
@media screen and (min-width: 768px) {
  aside {
    flex-direction: column;
    width: 10rem;
  }
  p,
  h5 {
    display: block;
  }
}
</style>
