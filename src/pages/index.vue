<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import PetalFall from '../components/atmosphere/PetalFall.vue'
import SvgCloud from '../components/decorations/SvgCloud.vue'
import SvgFlower from '../components/decorations/SvgFlower.vue'
import SvgHeart from '../components/decorations/SvgHeart.vue'
import SvgStar from '../components/decorations/SvgStar.vue'
import FamiliarDoorSection from '../components/home/FamiliarDoorSection.vue'
import GrowthStorybook from '../components/home/GrowthStorybook.vue'
import HomeBgm from '../components/home/HomeBgm.vue'
import HomeHero from '../components/home/HomeHero.vue'
import { useFloating } from '../composables/useFloating'
import { useGsapContext } from '../composables/useGsapContext'

const root = ref<HTMLElement>()
const cloud = ref<HTMLElement>()
const star = ref<HTMLElement>()
const flower = ref<HTMLElement>()
const bgm = useTemplateRef<InstanceType<typeof HomeBgm>>('home-bgm')

useGsapContext(root)
useFloating(cloud, { y: -8, duration: 5 })
useFloating(star, { y: 6, duration: 3 })
useFloating(flower, { y: -5, duration: 4 })

function startStoryBgm() {
  // Keep play() inside the click handler so browsers retain user activation.
  // Source: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay
  void bgm.value?.startForStoryNavigation()
}
</script>

<template>
  <div ref="root" class="little-world min-h-dvh overflow-x-clip">
    <PetalFall :count="6" />
    <div class="decorations pointer-events-none absolute inset-0" aria-hidden="true">
      <div ref="cloud" class="cloud">
        <SvgCloud :size="138" color="#dff1ff" />
      </div>
      <div ref="star" class="star">
        <SvgStar :size="24" color="#f2bd39" />
      </div>
      <div ref="flower" class="flower">
        <SvgFlower :size="28" color="#ee88a5" />
      </div>
      <div class="heart">
        <SvgHeart :size="18" color="#ed829d" />
      </div>
    </div>

    <HomeHero @start-story="startStoryBgm" />
    <GrowthStorybook />
    <FamiliarDoorSection />
    <HomeBgm ref="home-bgm" />
  </div>
</template>

<style scoped>
.little-world {
  --ink: var(--color-story-ink);
  --ink-soft: var(--color-story-ink-soft);
  --paper: var(--color-story-paper);
  --line: var(--color-story-line);
  --pink: var(--color-story-pink);
  --yellow: var(--color-story-yellow);
  --door: #e889a5;
  color: var(--ink);
  background-color: var(--paper);
  background-image: repeating-linear-gradient(to bottom, transparent 0 31px, var(--line) 32px 33px);
}
.cloud,
.star,
.flower,
.heart {
  position: absolute;
}
.cloud {
  top: 5rem;
  right: -2rem;
}
.star {
  top: 14rem;
  left: 8%;
}
.flower {
  right: 11%;
  bottom: 4rem;
}
.heart {
  top: 9rem;
  right: 18%;
}
@media (min-width: 48rem) {
  .cloud {
    right: 8%;
  }
}
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>
