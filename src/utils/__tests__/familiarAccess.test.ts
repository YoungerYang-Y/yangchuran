import { describe, expect, it } from 'vitest'
import {
  createFamiliarAccess,
  FAMILIAR_ACCESS_DURATION_MS,
  FAMILIAR_ACCESS_STORAGE_KEY,
} from '../familiarAccess'

function createStorage() {
  const entries = new Map<string, string>()

  return {
    getItem: (key: string) => entries.get(key) ?? null,
    setItem: (key: string, value: string) => entries.set(key, value),
    removeItem: (key: string) => entries.delete(key),
  }
}

function createUnavailableStorage() {
  const unavailable = () => {
    throw new DOMException('Storage is unavailable', 'SecurityError')
  }

  return { getItem: unavailable, setItem: unavailable, removeItem: unavailable }
}

describe('createFamiliarAccess', () => {
  it('grants familiar access for 30 days after a correct password', () => {
    const storage = createStorage()
    const access = createFamiliarAccess({ password: 'little-world', storage, now: () => 1_000 })

    expect(access.unlock('little-world')).toBe(true)
    expect(access.isUnlocked()).toBe(true)
    expect(storage.getItem(FAMILIAR_ACCESS_STORAGE_KEY)).toBe(String(1_000 + FAMILIAR_ACCESS_DURATION_MS))
  })

  it('does not grant access or persist a value for an incorrect password', () => {
    const storage = createStorage()
    const access = createFamiliarAccess({ password: 'little-world', storage, now: () => 1_000 })

    expect(access.unlock('not-the-password')).toBe(false)
    expect(access.isUnlocked()).toBe(false)
    expect(storage.getItem(FAMILIAR_ACCESS_STORAGE_KEY)).toBeNull()
  })

  it('removes an expired familiar access record', () => {
    const storage = createStorage()
    storage.setItem(FAMILIAR_ACCESS_STORAGE_KEY, '999')
    const access = createFamiliarAccess({ password: 'little-world', storage, now: () => 1_000 })

    expect(access.isUnlocked()).toBe(false)
    expect(storage.getItem(FAMILIAR_ACCESS_STORAGE_KEY)).toBeNull()
  })

  it('does not reuse an access record when a password is not configured', () => {
    const storage = createStorage()
    storage.setItem(FAMILIAR_ACCESS_STORAGE_KEY, String(1_000 + FAMILIAR_ACCESS_DURATION_MS))
    const access = createFamiliarAccess({ password: '', storage, now: () => 1_000 })

    expect(access.isUnlocked()).toBe(false)
    expect(storage.getItem(FAMILIAR_ACCESS_STORAGE_KEY)).toBeNull()
  })

  it('keeps familiar access for the current visit when browser storage is unavailable', () => {
    const access = createFamiliarAccess({ password: 'little-world', storage: createUnavailableStorage(), now: () => 1_000 })

    expect(access.unlock('little-world')).toBe(true)
    expect(access.isUnlocked()).toBe(true)
    expect(access.hasStorageIssue()).toBe(true)
  })
})
