<script setup lang="ts">
import type { Ref } from 'vue'
import gsap from 'gsap'
import { inject, onMounted, ref } from 'vue'
import { GSAP_CONTEXT_KEY, GSAP_REDUCED_KEY } from '../../composables/useGsapContext'

const props = withDefaults(defineProps<{
  count?: number
  colors?: string[]
  delay?: number
}>(), {
  count: 3,
  colors: () => ['#f48fb1', '#ce93d8', '#90caf9'],
  delay: 0,
})

const container = ref<HTMLElement>()
const context = inject<Ref<gsap.Context | null>>(GSAP_CONTEXT_KEY)
const prefersReduced = inject<Ref<boolean>>(GSAP_REDUCED_KEY)

onMounted(() => {
  if (prefersReduced?.value || !container.value || !context?.value)
    return
  const balloons = container.value.querySelectorAll('.balloon')
  context.value.add(() => {
    gsap.from(balloons, {
      y: '100vh',
      rotation: () => gsap.utils.random(-20, 20),
      opacity: 0,
      duration: 1.5,
      ease: 'elastic.out(1, 0.5)',
      stagger: 0.2,
      delay: props.delay,
    })
    // Float after entering
    gsap.to(balloons, {
      y: -8,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: props.delay + 1.5,
    })
  })
})
</script>

<template>
  <div ref="container" class="absolute inset-0 pointer-events-none overflow-hidden">
    <span
      v-for="i in count"
      :key="i"
      class="balloon absolute text-4xl"
      :style="{
        left: `${10 + (i - 1) * (80 / count)}%`,
        top: `${20 + (i % 3) * 15}%`,
        color: colors[(i - 1) % colors.length],
      }"
    >🎈</span>
  </div>
</template>
