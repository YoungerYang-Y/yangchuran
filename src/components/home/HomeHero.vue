<script setup lang="ts">
import { ref } from 'vue'
import { useGsapEntrance } from '../../composables/useGsapEntrance'
import { homeMoments } from '../../data/homeMoments'

const emit = defineEmits<{
  startStory: []
}>()

const hero = ref<HTMLElement>()
const firstStoryYear = homeMoments[0]?.year ?? 2022
const latestStoryYear = homeMoments.at(-1)?.year ?? firstStoryYear
const heroTitle = Array.from('果果的小小世界')

useGsapEntrance(hero, { from: { autoAlpha: 0, y: 28, rotation: -2 }, duration: 0.7, ease: 'power2.out', delay: 0.15 })
</script>

<template>
  <section ref="hero" class="hero-section grid min-h-dvh content-center py-20 text-center" aria-labelledby="page-title">
    <p class="eyebrow text-sm font-bold tracking-[0.12em] text-story-pink">
      从 {{ firstStoryYear }} 到 {{ latestStoryYear }}，每年一张年度照片
    </p>
    <h1 id="page-title" class="font-handwrite">
      <span v-for="(character, index) in heroTitle" :key="`${character}-${index}`" class="hero-letter">
        {{ character }}
      </span>
    </h1>
    <p class="hero-copy mx-auto">
      <span>从挥挥小手，</span><span>到带着好多为什么认识世界。</span><br>
      <span>把果果每一年的发现，</span><span>慢慢翻给你看。</span>
    </p>
    <a class="scroll-hint mx-auto mt-8 w-fit" href="#moments" @click="emit('startStory')">伴着音乐，往下翻 {{ homeMoments.length }} 张年度故事 <span aria-hidden="true">↓</span></a>
  </section>
</template>

<style scoped>
h1,
p {
  text-wrap: balance;
}
h1 {
  margin: 0.75rem 0 1rem;
  font-size: clamp(3rem, 12.5vw, 6.25rem);
  line-height: 0.95;
  color: var(--ink);
  white-space: nowrap;
}
.hero-letter {
  display: inline-block;
  cursor: default;
  transform-origin: center bottom;
  transition:
    color 0.15s ease-out,
    transform 0.15s ease-out;
}
.hero-letter:nth-child(3n + 1) {
  --letter-rotation: -5deg;
  --letter-lift: -0.12em;
  --letter-color: var(--pink);
}
.hero-letter:nth-child(3n + 2) {
  --letter-rotation: 4deg;
  --letter-lift: -0.18em;
  --letter-color: #d49228;
}
.hero-letter:nth-child(3n) {
  --letter-rotation: -2deg;
  --letter-lift: -0.08em;
  --letter-color: var(--ink-soft);
}
.hero-letter:hover {
  color: var(--letter-color);
  transform: translateY(var(--letter-lift)) rotate(var(--letter-rotation));
}
.hero-copy {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--ink-soft);
}
.hero-copy span {
  display: inline-block;
  transition:
    color 0.15s ease-out,
    transform 0.15s ease-out;
}
.hero-copy span:nth-child(odd):hover {
  color: var(--pink);
  transform: rotate(-1.5deg) translateY(-0.15rem);
}
.hero-copy span:nth-child(even):hover {
  color: var(--ink);
  transform: rotate(1.5deg) translateY(-0.15rem);
}
.scroll-hint {
  padding-bottom: 0.35rem;
  color: var(--ink);
  font-size: 1.125rem;
  font-weight: 700;
  text-decoration: none;
  border-bottom: 2px dashed var(--pink);
  transition:
    color 0.15s ease-out,
    transform 0.15s ease-out;
}
.scroll-hint:hover {
  color: var(--pink);
  transform: rotate(-1deg) translateY(-0.15rem);
}
.scroll-hint span {
  display: inline-block;
  margin-left: 0.35rem;
  color: var(--pink);
}
</style>
