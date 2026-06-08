<script setup lang="ts">
import gsap from 'gsap'
import { onMounted, onUnmounted, ref } from 'vue'

withDefaults(defineProps<{
  count?: number
}>(), {
  count: 15,
})

const container = ref<HTMLElement>()
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!container.value)
    return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return

  ctx = gsap.context(() => {
    const dots = container.value!.querySelectorAll('.glow-dot')
    dots.forEach((dot) => {
      gsap.set(dot, {
        x: gsap.utils.random(0, window.innerWidth),
        y: gsap.utils.random(0, window.innerHeight),
        scale: gsap.utils.random(0.5, 1),
      })

      // Float randomly
      gsap.to(dot, {
        x: `+=${gsap.utils.random(-80, 80)}`,
        y: `+=${gsap.utils.random(-60, 60)}`,
        duration: gsap.utils.random(4, 8),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Pulse opacity
      gsap.to(dot, {
        opacity: gsap.utils.random(0.2, 0.7),
        duration: gsap.utils.random(2, 4),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: gsap.utils.random(0, 3),
      })
    })
  }, container.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <div ref="container" class="absolute inset-0 pointer-events-none overflow-hidden">
    <div
      v-for="i in count"
      :key="i"
      class="glow-dot absolute w-1.5 h-1.5 rounded-full bg-pink-300/50 opacity-0 shadow-[0_0_6px_2px_rgba(244,143,177,0.3)]"
    />
  </div>
</template>
