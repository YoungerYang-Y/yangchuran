<script setup lang="ts">
import gsap from 'gsap'
import { onMounted, onUnmounted, ref } from 'vue'

withDefaults(defineProps<{
  count?: number
}>(), {
  count: 12,
})

const container = ref<HTMLElement>()
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!container.value)
    return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return

  ctx = gsap.context(() => {
    const petals = container.value!.querySelectorAll('.petal')
    petals.forEach((petal) => {
      const startX = gsap.utils.random(0, 100)
      const duration = gsap.utils.random(6, 12)
      const delay = gsap.utils.random(0, 8)
      const swayAmount = gsap.utils.random(30, 80)

      gsap.set(petal, { x: `${startX}vw`, y: -30, rotation: gsap.utils.random(-30, 30) })

      gsap.to(petal, {
        y: '105vh',
        x: `+=${swayAmount}`,
        rotation: `+=${gsap.utils.random(180, 540)}`,
        duration,
        delay,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x: number) => Number.parseFloat(String(x)) % (window.innerWidth + 100)),
        },
      })
    })
  }, container.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <div ref="container" class="fixed inset-0 pointer-events-none z-10 overflow-hidden">
    <div
      v-for="i in count"
      :key="i"
      class="petal absolute opacity-60"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <ellipse cx="7" cy="7" rx="4" ry="7" fill="#f8bbd0" transform="rotate(15 7 7)" />
      </svg>
    </div>
  </div>
</template>
