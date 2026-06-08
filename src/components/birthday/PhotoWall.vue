<script setup lang="ts">
import { ref } from 'vue'
import { useStaggerReveal } from '../../composables/useStaggerReveal'

withDefaults(defineProps<{
  images: string[]
  columns?: number
}>(), {
  columns: 3,
})

const container = ref<HTMLElement>()
useStaggerReveal(container, '.photo-item', { from: { opacity: 0, scale: 0.7, y: 30 }, ease: 'elastic.out(1, 0.6)' })
</script>

<template>
  <section class="py-12 px-4">
    <div
      ref="container"
      class="grid gap-4 max-w-4xl mx-auto"
      :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }"
    >
      <div
        v-for="(img, i) in images"
        :key="i"
        class="photo-item aspect-square rounded-xl overflow-hidden shadow-md"
      >
        <img
          :src="img"
          :alt="`Photo ${i + 1}`"
          loading="lazy"
          class="w-full h-full object-cover"
          @error="($event.target as HTMLImageElement).style.background = '#f8bbd0'"
        >
      </div>
    </div>
  </section>
</template>
