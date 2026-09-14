import { describe, expect, it } from 'vitest'
import { clampMap, getCardOffsetX, getCardOpacity, getCharacterExitOpacity, getCharacterRevealProgress, getStoryStageHeight } from '../useStorybookScroll'

describe('clampMap', () => {
  it('maps a scroll progress range to an animation range', () => {
    expect(clampMap(0.25, [0.2, 0.4], [0, 1])).toBeCloseTo(0.25)
    expect(clampMap(0.3, [0.2, 0.4], [0, 1])).toBeCloseTo(0.5)
    expect(clampMap(0.4, [0.2, 0.4], [0, 1])).toBe(1)
  })

  it('clamps values outside the scroll range', () => {
    expect(clampMap(0.1, [0.2, 0.4], [0, 1])).toBe(0)
    expect(clampMap(0.6, [0.2, 0.4], [0, 1])).toBe(1)
  })
})

describe('getStoryStageHeight', () => {
  it('extends the scroll stage as age stories are added', () => {
    expect(getStoryStageHeight(4)).toBe(880)
    expect(getStoryStageHeight(6)).toBe(1320)
  })

  it('keeps enough scroll space for a short story list', () => {
    expect(getStoryStageHeight(1)).toBe(520)
    expect(getStoryStageHeight(2)).toBe(520)
  })
})

describe('getCharacterRevealProgress', () => {
  it('keeps the first story text complete when the stage opens', () => {
    expect(getCharacterRevealProgress(0, 2, 0, 100, 4, 0)).toBe(1)
  })

  it('reveals later story text one character at a time', () => {
    expect(getCharacterRevealProgress(1, 2, 0, 4, 4, 0.36)).toBeGreaterThan(0)
    expect(getCharacterRevealProgress(1, 2, 3, 4, 4, 0.36)).toBe(0)
  })

  it('keeps a reading interval after later story text has fully appeared', () => {
    expect(getCharacterRevealProgress(1, 2, 3, 4, 4, 0.42)).toBe(1)
    expect(getCharacterExitOpacity(1, 2, 0, 4, 4, 0.42)).toBe(1)
  })
})

describe('chapter transitions', () => {
  it('moves every later card through the shared center without crossing the whole screen', () => {
    expect(getCardOffsetX(1, 4, 0.25)).toBe(8)
    expect(getCardOffsetX(1, 4, 0.32)).toBe(0)
    expect(getCardOffsetX(1, 4, 0.48)).toBeLessThan(0)
    expect(getCardOffsetX(1, 4, 0.5)).toBe(-8)
  })

  it('uses a shorter horizontal shift on small screens', () => {
    expect(getCardOffsetX(1, 4, 0.25, 4)).toBe(4)
    expect(getCardOffsetX(1, 4, 0.5, 4)).toBe(-4)
  })

  it('fades each later card in and then out', () => {
    expect(getCardOpacity(1, 4, 0.25)).toBe(0)
    expect(getCardOpacity(1, 4, 0.29)).toBeGreaterThan(0)
    expect(getCardOpacity(1, 4, 0.48)).toBeLessThan(1)
    expect(getCardOpacity(1, 4, 0.5)).toBe(0)
  })

  it('fades opening text out one character at a time', () => {
    expect(getCharacterExitOpacity(0, 2, 0, 4, 4, 0.16)).toBe(1)
    expect(getCharacterExitOpacity(0, 2, 0, 4, 4, 0.20)).toBeLessThan(1)
    expect(getCharacterExitOpacity(0, 2, 3, 4, 4, 0.20)).toBe(1)
  })
})
