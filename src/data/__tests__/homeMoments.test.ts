import { describe, expect, it } from 'vitest'

import { homeMoments } from '../homeMoments'

describe('homeMoments', () => {
  it('包含 2022 到 2026 的五张年度故事', () => {
    expect(homeMoments.map(moment => moment.year)).toEqual([2022, 2023, 2024, 2025, 2026])
  })
})
