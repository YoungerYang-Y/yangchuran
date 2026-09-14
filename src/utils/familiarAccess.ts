export const FAMILIAR_ACCESS_STORAGE_KEY = 'yangchuran:familiar-access-until'
export const FAMILIAR_ACCESS_DURATION_MS = 30 * 24 * 60 * 60 * 1_000

export interface StorageLike {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
  removeItem: (key: string) => void
}

interface FamiliarAccessOptions {
  password: string
  storage: StorageLike
  now?: () => number
}

export function createFamiliarAccess({ password, storage, now = Date.now }: FamiliarAccessOptions) {
  let temporaryExpiresAt: number | undefined
  let storageIssue = false

  function removePersistedAccess() {
    try {
      storage.removeItem(FAMILIAR_ACCESS_STORAGE_KEY)
    }
    catch {
      storageIssue = true
    }
  }

  function isUnlocked() {
    if (!password) {
      temporaryExpiresAt = undefined
      removePersistedAccess()
      return false
    }

    const currentTime = now()
    if (temporaryExpiresAt && temporaryExpiresAt > currentTime)
      return true

    let expiresAt: number | undefined
    try {
      expiresAt = Number(storage.getItem(FAMILIAR_ACCESS_STORAGE_KEY))
    }
    catch {
      storageIssue = true
    }

    if (typeof expiresAt === 'number' && Number.isFinite(expiresAt) && expiresAt > currentTime)
      return true

    removePersistedAccess()
    return false
  }

  function unlock(candidate: string) {
    if (!password || candidate !== password)
      return false

    temporaryExpiresAt = now() + FAMILIAR_ACCESS_DURATION_MS
    try {
      storage.setItem(FAMILIAR_ACCESS_STORAGE_KEY, String(temporaryExpiresAt))
    }
    catch {
      storageIssue = true
    }
    return true
  }

  return { hasStorageIssue: () => storageIssue, isUnlocked, unlock }
}
