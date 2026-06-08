<script setup lang="ts">
import { ref } from 'vue'
import { useGsapEntrance } from '../../composables/useGsapEntrance'
import { useStaggerReveal } from '../../composables/useStaggerReveal'

defineProps<{
  title: string
  subtitle?: string
  background?: string
}>()

const titleEl = ref<HTMLElement>()
const subtitleEl = ref<HTMLElement>()

useStaggerReveal(titleEl, 'span', { from: { opacity: 0, y: 20, scale: 0.5 }, stagger: 0.05, ease: 'elastic.out(1, 0.5)' })
useGsapEntrance(subtitleEl, { from: { opacity: 0, y: 20 }, delay: 0.5 })
</script>

<template>
  <section
    class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    :style="background ? { background } : {}"
  >
    <h1 ref="titleEl" class="text-3xl sm:text-5xl font-extrabold text-center mb-4 z-10">
      <span v-for="(char, i) in [...title]" :key="i" class="inline-block">{{ char === ' ' ? '\u00A0' : char }}</span>
    </h1>
    <p v-if="subtitle" ref="subtitleEl" class="text-lg text-center z-10 opacity-80">
      {{ subtitle }}
    </p>
    <slot />
  </section>
</template>
