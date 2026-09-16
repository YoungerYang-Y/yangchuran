import { ref } from 'vue'

export const BGM_VOLUME = 0.2

interface ViewportBounds {
  top: number
  bottom: number
}

interface BgmAudio {
  currentTime: number
  muted: boolean
  volume: number
  play: () => Promise<void>
  pause: () => void
}

interface CreateBgmPlayerOptions {
  audio: BgmAudio
}

export function isElementInViewport({ top, bottom }: ViewportBounds, viewportHeight: number) {
  return top < viewportHeight && bottom > 0
}

export function createBgmPlayer({ audio }: CreateBgmPlayerOptions) {
  const canAutoplay = ref(true)
  const isPlaying = ref(false)
  const isPrimed = ref(false)
  const playbackIssue = ref<'blocked' | 'failed' | null>(null)

  async function play() {
    if (isPlaying.value)
      return true

    audio.volume = BGM_VOLUME

    if (isPrimed.value) {
      audio.currentTime = 0
      audio.muted = false
      isPrimed.value = false
      isPlaying.value = true
      canAutoplay.value = true
      playbackIssue.value = null
      return true
    }

    audio.muted = false

    try {
      await audio.play()
      isPlaying.value = true
      canAutoplay.value = true
      playbackIssue.value = null
      return true
    }
    catch (error) {
      isPlaying.value = false
      playbackIssue.value = error instanceof Error && error.name === 'NotAllowedError' ? 'blocked' : 'failed'
      return false
    }
  }

  function pause() {
    audio.pause()
    audio.muted = false
    audio.currentTime = 0
    isPlaying.value = false
    isPrimed.value = false
    canAutoplay.value = false
    playbackIssue.value = null
  }

  async function startForStoryNavigation() {
    return play()
  }

  async function primeForStory() {
    if (isPlaying.value || isPrimed.value || !canAutoplay.value)
      return isPlaying.value || isPrimed.value

    audio.volume = BGM_VOLUME
    audio.muted = true

    try {
      await audio.play()
      audio.currentTime = 0
      isPrimed.value = true
      return true
    }
    catch {
      audio.muted = false
      return false
    }
  }

  async function tryAutoplay() {
    if (!canAutoplay.value)
      return false

    return play()
  }

  async function toggle() {
    if (isPlaying.value) {
      pause()
      return false
    }

    return play()
  }

  return { isPlaying, canAutoplay, playbackIssue, play, pause, primeForStory, startForStoryNavigation, tryAutoplay, toggle }
}
