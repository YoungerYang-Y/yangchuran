<script setup lang="ts">
import { computed, onMounted, onUnmounted, shallowRef, useTemplateRef } from 'vue'
// Vite asset URL import: https://vite.dev/guide/assets.html
import bgmSource from '../../assets/audio/home-bgm.m4a?url'
import { createBgmPlayer, isElementInViewport } from '../../composables/useBgm'

const audio = useTemplateRef<HTMLAudioElement>('home-bgm')
const player = shallowRef<ReturnType<typeof createBgmPlayer>>()
let storyObserver: IntersectionObserver | undefined
let hasTriedAutoplay = false

const isReady = computed(() => player.value !== undefined)
const isPlaying = computed(() => player.value?.isPlaying.value ?? false)
const needsTouch = computed(() => player.value?.playbackIssue.value === 'blocked')
const buttonText = computed(() => {
  if (isPlaying.value)
    return '暂停音乐'

  if (player.value?.playbackIssue.value === 'blocked')
    return '点一下，开启音乐'

  if (player.value?.playbackIssue.value === 'failed')
    return '音乐加载失败，点击重试'

  return '播放音乐'
})

async function toggleBgm() {
  await player.value?.toggle()
}

async function startForStoryNavigation() {
  return player.value?.startForStoryNavigation() ?? false
}

function isInteractiveTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest('a, button, input, select, textarea, [role="button"]'))
}

function isStoryInView() {
  const storyIntro = document.querySelector<HTMLElement>('#story-intro')
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight
  return storyIntro && isElementInViewport(storyIntro.getBoundingClientRect(), viewportHeight)
}

function handleStoryTouchEnd(event: TouchEvent) {
  if (isInteractiveTarget(event.target) || !isStoryInView())
    return

  // A mobile browser can grant media permission during this real touch interaction.
  // Source: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay
  void player.value?.tryAutoplay()
}

function handleStoryTouchStart(event: TouchEvent) {
  if (isInteractiveTarget(event.target))
    return

  if (isStoryInView()) {
    void player.value?.startForStoryNavigation()
    return
  }

  // Prime muted playback while this touch still carries browser activation.
  // Source: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay
  void player.value?.primeForStory()
}

function watchStoryStart() {
  const storyIntro = document.querySelector<HTMLElement>('#story-intro')
  if (!storyIntro)
    return

  // Start once when the annual-story title reaches the visible part of the viewport.
  // Source: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  storyObserver = new IntersectionObserver((entries) => {
    if (hasTriedAutoplay || !entries.some(entry => entry.isIntersecting))
      return

    hasTriedAutoplay = true
    storyObserver?.disconnect()

    void player.value?.tryAutoplay()
  }, { threshold: 0, rootMargin: '0px 0px -20% 0px' })

  storyObserver.observe(storyIntro)
}

onMounted(() => {
  if (!audio.value)
    return

  // Template refs keep native media controls local to this component.
  // Source: https://vuejs.org/guide/essentials/template-refs.html
  player.value = createBgmPlayer({ audio: audio.value })
  watchStoryStart()
  document.addEventListener('touchstart', handleStoryTouchStart, { passive: true })
  document.addEventListener('touchend', handleStoryTouchEnd, { passive: true })
})

onUnmounted(() => {
  storyObserver?.disconnect()
  document.removeEventListener('touchstart', handleStoryTouchStart)
  document.removeEventListener('touchend', handleStoryTouchEnd)
})

defineExpose({ startForStoryNavigation })
</script>

<template>
  <audio ref="home-bgm" loop preload="metadata">
    <source :src="bgmSource" type="audio/mp4">
  </audio>

  <button
    class="home-bgm"
    :class="{ 'home-bgm--needs-touch': needsTouch }"
    type="button"
    :aria-label="buttonText"
    :aria-pressed="isPlaying"
    :disabled="!isReady"
    :title="buttonText"
    @click="toggleBgm"
  >
    <svg v-if="isPlaying" class="home-bgm-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14M16 5v14" />
    </svg>
    <svg v-else class="home-bgm-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 6v12l9-6z" />
    </svg>
    <span>{{ buttonText }}</span>
  </button>
</template>

<style scoped>
.home-bgm {
  position: fixed;
  right: max(1rem, calc(env(safe-area-inset-right) + 0.75rem));
  bottom: max(1rem, calc(env(safe-area-inset-bottom) + 0.75rem));
  z-index: 30;
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  color: var(--color-story-ink);
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1;
  background: var(--color-story-paper);
  border: 2px solid var(--color-story-ink);
  border-radius: 999px;
  box-shadow: 3px 3px 0 var(--color-story-yellow);
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition:
    background-color 0.15s ease-out,
    box-shadow 0.15s ease-out,
    transform 0.15s ease-out;
}
.home-bgm:hover {
  background: var(--color-story-line);
  box-shadow: 4px 4px 0 var(--color-story-pink);
  transform: translateY(-2px);
}
.home-bgm:focus-visible {
  outline: 3px solid var(--color-story-pink);
  outline-offset: 3px;
}
.home-bgm:active {
  box-shadow: 1px 1px 0 var(--color-story-pink);
  transform: translate(2px, 2px);
}
.home-bgm:disabled {
  box-shadow: none;
  cursor: not-allowed;
  opacity: 0.6;
  transform: none;
}
.home-bgm-icon {
  width: 1.25rem;
  height: 1.25rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2.5;
}
@media (max-width: 30rem) {
  .home-bgm {
    min-height: 3rem;
    padding: 0.625rem 0.75rem;
    font-size: 0.8125rem;
  }
  .home-bgm--needs-touch {
    left: max(0.75rem, calc(env(safe-area-inset-left) + 0.75rem));
    right: max(0.75rem, calc(env(safe-area-inset-right) + 0.75rem));
    justify-content: center;
  }
}
@media (prefers-reduced-motion: reduce) {
  .home-bgm {
    transition: none;
  }
}
</style>
