import { CACHE_TTL } from '../utils/constants'

interface CacheEntry<T> {
  data: T
  timestamp: number
}

export function getFromCache<T>(key: string) {
  const raw = localStorage.getItem(key)
  if (!raw) return null

  const entry: CacheEntry<T> = JSON.parse(raw)
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    localStorage.removeItem(key)
    return null
  }

  return entry.data
}

export function saveToCache<T>(key: string, data: T) {
  const entry: CacheEntry<T> = { data, timestamp: Date.now() }
  localStorage.setItem(key, JSON.stringify(entry))
}
