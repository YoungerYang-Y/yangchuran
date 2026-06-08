<script setup lang="ts">
import type { Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { inject, onMounted, ref } from 'vue'
import { GSAP_CONTEXT_KEY, GSAP_REDUCED_KEY } from '../../composables/useGsapContext'

withDefaults(defineProps<{
  images: string[]
  speed?: number
}>(), {
  speed: 0.3,
})

gsap.registerPlugin(ScrollTrigger)

const container = ref<HTMLElement>()
const context = inject<Ref<gsap.Context | null>>(GSAP_CONTEXT_KEY)
const prefersReduced = inject<Ref<boolean>>(GSAP_REDUCED_KEY)

onMounted(() => {
  if (prefersReduced?.value || !container.value || !context?.value)
    return
  const items = container.value.querySelectorAll('.parallax-img')
  context.value.add(() => {
    items.forEach((img, i) => {
      gsap.to(img, {
        y: () => (i % 2 === 0 ? -50 : 50),
        ease: 'none',
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
  })
})
</script>

<template>
  <section class="py-12 px-4">
    <div ref="container" class="flex gap-4 max-w-4xl mx-auto justify-center flex-wrap">
      <div
        v-for="(img, i) in images"
        :key="i"
        class="parallax-img w-40 h-56 sm:w-48 sm:h-64 rounded-xl overflow-hidden shadow-lg"
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
