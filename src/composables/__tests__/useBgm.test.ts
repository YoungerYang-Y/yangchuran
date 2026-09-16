import { describe, expect, it, vi } from 'vitest'
import { BGM_VOLUME, createBgmPlayer, isElementInViewport } from '../useBgm'

function createAudio() {
  return {
    volume: 1,
    muted: false,
    currentTime: 0,
    play: vi.fn<() => Promise<void>>().mockResolvedValue(undefined),
    pause: vi.fn(),
  }
}

describe('createBgmPlayer', () => {
  it('recognizes the annual story only when it overlaps the viewport', () => {
    expect(isElementInViewport({ top: 667, bottom: 900 }, 667)).toBe(false)
    expect(isElementInViewport({ top: 666, bottom: 900 }, 667)).toBe(true)
    expect(isElementInViewport({ top: -200, bottom: 0 }, 667)).toBe(false)
  })

  it('waits for the story trigger before starting music', () => {
    const audio = createAudio()
    const player = createBgmPlayer({ audio })
    expect(player.isPlaying.value).toBe(false)
    expect(player.canAutoplay.value).toBe(true)
    expect(audio.play).not.toHaveBeenCalled()
  })

  it('starts at a gentle volume when the annual story enters view', async () => {
    const audio = createAudio()
    const player = createBgmPlayer({ audio })
    await expect(player.tryAutoplay()).resolves.toBe(true)
    expect(audio.volume).toBe(BGM_VOLUME)
    expect(player.isPlaying.value).toBe(true)
  })

  it('silently primes music during a mobile gesture before the annual story is visible', async () => {
    const audio = createAudio()
    const player = createBgmPlayer({ audio })

    await expect(player.primeForStory()).resolves.toBe(true)

    expect(audio.muted).toBe(true)
    expect(audio.play).toHaveBeenCalledOnce()
    expect(player.isPlaying.value).toBe(false)
  })

  it('starts a primed track from the beginning when the annual story appears', async () => {
    const audio = createAudio()
    const player = createBgmPlayer({ audio })
    await player.primeForStory()
    audio.currentTime = 12

    await expect(player.tryAutoplay()).resolves.toBe(true)

    expect(audio.muted).toBe(false)
    expect(audio.currentTime).toBe(0)
    expect(audio.play).toHaveBeenCalledOnce()
    expect(player.isPlaying.value).toBe(true)
  })

  it('keeps a pause for the current visit until an explicit story click', async () => {
    const audio = createAudio()
    const player = createBgmPlayer({ audio })
    await player.tryAutoplay()
    player.pause()
    await expect(player.tryAutoplay()).resolves.toBe(false)
    expect(audio.play).toHaveBeenCalledOnce()
    await expect(player.startForStoryNavigation()).resolves.toBe(true)
    expect(audio.play).toHaveBeenCalledTimes(2)
  })

  it('does not carry a pause into a new visit or access persistent storage', async () => {
    const storage = { getItem: vi.fn(() => 'off'), setItem: vi.fn() }
    // Old persisted values must have no effect on a new visit.
    const options = { audio: createAudio(), storage }
    const firstVisit = createBgmPlayer(options)
    firstVisit.pause()
    const nextVisit = createBgmPlayer(options)
    await expect(nextVisit.tryAutoplay()).resolves.toBe(true)
    expect(storage.getItem).not.toHaveBeenCalled()
    expect(storage.setItem).not.toHaveBeenCalled()
  })

  it('does not restart playback when click and visibility triggers both fire', async () => {
    const audio = createAudio()
    const player = createBgmPlayer({ audio })
    await player.startForStoryNavigation()
    await player.tryAutoplay()
    expect(audio.play).toHaveBeenCalledOnce()
  })

  it('shows a blocked hint and clears it after a successful user gesture', async () => {
    const audio = createAudio()
    audio.play.mockRejectedValueOnce(new DOMException('Playback blocked', 'NotAllowedError'))
    const player = createBgmPlayer({ audio })
    await expect(player.tryAutoplay()).resolves.toBe(false)
    expect(player.playbackIssue.value).toBe('blocked')
    expect(player.isPlaying.value).toBe(false)
    await expect(player.startForStoryNavigation()).resolves.toBe(true)
    expect(player.playbackIssue.value).toBe(null)
    expect(player.isPlaying.value).toBe(true)
  })

  it('distinguishes a media failure from a blocked autoplay attempt', async () => {
    const audio = createAudio()
    audio.play.mockRejectedValueOnce(new DOMException('Unsupported audio', 'NotSupportedError'))
    const player = createBgmPlayer({ audio })
    await expect(player.play()).resolves.toBe(false)
    expect(player.playbackIssue.value).toBe('failed')
    expect(player.isPlaying.value).toBe(false)
  })

  it('toggles playback and pause with one control', async () => {
    const audio = createAudio()
    const player = createBgmPlayer({ audio })
    await expect(player.toggle()).resolves.toBe(true)
    await expect(player.toggle()).resolves.toBe(false)
    expect(audio.play).toHaveBeenCalledOnce()
    expect(audio.pause).toHaveBeenCalledOnce()
    expect(player.canAutoplay.value).toBe(false)
  })
})
