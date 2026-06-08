<script setup lang="ts">
import type { Ref } from 'vue'
import gsap from 'gsap'
import { inject, onMounted, ref } from 'vue'
import { GSAP_CONTEXT_KEY, GSAP_REDUCED_KEY } from '../../composables/useGsapContext'

const props = withDefaults(defineProps<{
  particleCount?: number
  spread?: number
}>(), {
  particleCount: 30,
  spread: 200,
})

const container = ref<HTMLElement>()
const context = inject<Ref<gsap.Context | null>>(GSAP_CONTEXT_KEY)
const prefersReduced = inject<Ref<boolean>>(GSAP_REDUCED_KEY)

const confettiColors = ['#e91e63', '#ff9800', '#4caf50', '#2196f3', '#9c27b0', '#ffeb3b']

onMounted(() => {
  if (prefersReduced?.value || !container.value || !context?.value)
    return
  const particles = container.value.querySelectorAll('.confetti')
  context.value.add(() => {
    gsap.from(particles, {
      scale: 0,
      opacity: 1,
      duration: 0,
    })
    gsap.to(particles, {
      x: () => gsap.utils.random(-props.spread, props.spread),
      y: () => gsap.utils.random(-props.spread, props.spread / 2),
      rotation: () => gsap.utils.random(-360, 360),
      opacity: 0,
      duration: () => gsap.utils.random(1, 2),
      ease: 'power2.out',
      stagger: 0.02,
      delay: 0.5,
    })
  })
})
</script>

<template>
  <div ref="container" class="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
    <span
      v-for="i in particleCount"
      :key="i"
      class="confetti absolute w-2 h-2 rounded-sm"
      :style="{ background: confettiColors[(i - 1) % confettiColors.length] }"
    />
  </div>
</template>
