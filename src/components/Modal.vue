<template>
  <Teleport to="body" v-if="isOpen">
    <div class="modal-mask" @click="emit('close-modal')">
      <div class="modal-container" @click.prevent.stop>
        <slot class="modal-header" name="header" />
        <slot class="modal-body" name="content" />
        <slot class="modal-body" name="footer" />
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { onUnmounted, watch } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()
const emit = defineEmits(['close-modal'])

watch(
  () => props.isOpen,
  () => {
    document.body.classList.toggle('modal-open', props.isOpen)
  }
)

onUnmounted(() => {
  document.body.classList.remove('modal-open')
})
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
  word-wrap: break-word;
  width: 40vw;
  max-height: 70vh;
  overflow: auto;
  margin: 30vh auto;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: var(--shadow-3);
}
</style>
