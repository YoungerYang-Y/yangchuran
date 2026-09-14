import type { Ref } from 'vue'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

const STORYBOOK_QUERY = '(min-width: 20rem)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export function getStoryStageHeight(storyCount: number) {
  return Math.max(520, storyCount * 220)
}

export function getCharacterRevealProgress(index: number, part: number, characterIndex: number, characterCount: number, storyCount: number, progress: number) {
  if (index === 0)
    return 1

  const chapterSize = 1 / storyCount
  const start = index * chapterSize + chapterSize * (0.14 + part * 0.14)
  const characterRange = chapterSize * 0.2 / Math.max(characterCount, 1)
  return clampMap(progress, [start + characterRange * characterIndex, start + characterRange * (characterIndex + 0.7)], [0, 1])
}

export function getCardOpacity(index: number, storyCount: number, progress: number) {
  const chapterSize = 1 / storyCount
  const chapterStart = index * chapterSize
  const entry = index === 0
    ? 1
    : clampMap(progress, [chapterStart, chapterStart + chapterSize * 0.16], [0, 1])
  const exit = clampMap(progress, [chapterStart + chapterSize * 0.88, chapterStart + chapterSize], [1, 0])
  return entry * exit
}

export function getCardOffsetX(index: number, storyCount: number, progress: number, travelDistance = 8) {
  const chapterSize = 1 / storyCount
  const chapterStart = index * chapterSize
  const entry = index === 0
    ? 1
    : clampMap(progress, [chapterStart, chapterStart + chapterSize * 0.16], [0, 1])
  const exit = clampMap(progress, [chapterStart + chapterSize * 0.88, chapterStart + chapterSize], [0, 1])
  return (1 - entry) * travelDistance - exit * travelDistance
}

export function getCharacterExitOpacity(index: number, part: number, characterIndex: number, characterCount: number, storyCount: number, progress: number) {
  const chapterSize = 1 / storyCount
  const start = index * chapterSize + chapterSize * (0.72 + part * 0.025)
  const characterRange = chapterSize * 0.11 / Math.max(characterCount, 1)
  return clampMap(progress, [start + characterRange * characterIndex, start + characterRange * (characterIndex + 0.7)], [1, 0])
}

export function clampMap(value: number, [fromStart, fromEnd]: [number, number], [toStart, toEnd]: [number, number]) {
  const clamped = Math.min(fromEnd, Math.max(fromStart, value))
  return toStart + ((clamped - fromStart) / (fromEnd - fromStart)) * (toEnd - toStart)
}

export function useStorybookScroll(stage: Ref<HTMLElement | undefined>, storyCount: number) {
  const isEnabled = ref(false)
  const progress = ref(0)
  let animationFrame = 0
  let resizeObserver: ResizeObserver | undefined
  let storybookQuery: MediaQueryList | undefined
  let reducedMotionQuery: MediaQueryList | undefined

  function update() {
    if (!stage.value || !storybookQuery || !reducedMotionQuery)
      return

    isEnabled.value = storybookQuery.matches && !reducedMotionQuery.matches
    if (!isEnabled.value) {
      progress.value = 0
      return
    }

    const scrollDistance = Math.max(stage.value.offsetHeight - window.innerHeight, 1)
    progress.value = clampMap(window.scrollY - stage.value.offsetTop, [0, scrollDistance], [0, 1])
  }

  function scheduleUpdate() {
    window.cancelAnimationFrame(animationFrame)
    animationFrame = window.requestAnimationFrame(update)
  }

  function letterStyle(index: number, part: number, characterIndex: number, characterCount: number) {
    if (!isEnabled.value)
      return undefined

    const amount = getCharacterRevealProgress(index, part, characterIndex, characterCount, storyCount, progress.value)
      * getCharacterExitOpacity(index, part, characterIndex, characterCount, storyCount, progress.value)
    return {
      opacity: amount,
      transform: `translate3d(0, ${(1 - amount) * 0.75}rem, 0)`,
    }
  }

  function cardStyle(index: number) {
    if (!isEnabled.value)
      return undefined

    const chapterSize = 1 / storyCount
    const scale = index === 0
      ? 1
      : clampMap(progress.value, [index * chapterSize, index * chapterSize + chapterSize * 0.2], [0.96, 1])
    const travelDistance = window.matchMedia('(max-width: 39.999rem)').matches ? 4 : 8
    const offset = getCardOffsetX(index, storyCount, progress.value, travelDistance)
    return {
      opacity: getCardOpacity(index, storyCount, progress.value),
      transform: `translate3d(${offset}vw, 0, 0) scale(${scale})`,
    }
  }

  function photoStyle(index: number) {
    if (!isEnabled.value)
      return undefined

    const amount = getCardOpacity(index, storyCount, progress.value)
    const baseRotation = index % 2 ? 2 : -2.5
    return {
      transform: `rotate(${baseRotation + (1 - amount) * -baseRotation * 0.3}deg) scale(${0.98 + amount * 0.02})`,
    }
  }

  const stageStyle = computed(() => isEnabled.value ? { minHeight: `${getStoryStageHeight(storyCount)}dvh` } : undefined)
  const activeStory = computed(() => Math.min(storyCount - 1, Math.floor(progress.value * storyCount)))

  function decorationStyle(speed: number, direction = 1) {
    if (!isEnabled.value)
      return undefined

    const position = (progress.value - 0.5) * speed * direction
    return { transform: `translate3d(${position * 5}rem, ${position * -3}rem, 0) rotate(${position * 12}deg)` }
  }

  onMounted(() => {
    storybookQuery = window.matchMedia(STORYBOOK_QUERY)
    reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY)
    resizeObserver = new ResizeObserver(scheduleUpdate)
    if (stage.value)
      resizeObserver.observe(stage.value)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    storybookQuery.addEventListener('change', scheduleUpdate)
    reducedMotionQuery.addEventListener('change', scheduleUpdate)
    nextTick(scheduleUpdate)
  })

  onUnmounted(() => {
    window.cancelAnimationFrame(animationFrame)
    resizeObserver?.disconnect()
    window.removeEventListener('scroll', scheduleUpdate)
    window.removeEventListener('resize', scheduleUpdate)
    storybookQuery?.removeEventListener('change', scheduleUpdate)
    reducedMotionQuery?.removeEventListener('change', scheduleUpdate)
  })

  return { activeStory, cardStyle, decorationStyle, isEnabled, letterStyle, photoStyle, stageStyle }
}
