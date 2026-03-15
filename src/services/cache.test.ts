import { afterEach, describe, expect, it, vi } from 'vitest'
import { getFromCache, saveToCache } from './cache'

describe('cache', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('saves and retrieves data', () => {
    saveToCache('key', { name: 'test' })
    const result = getFromCache<{ name: string }>('key')
    expect(result).toEqual({ name: 'test' })
  })

  it('returns null for missing key', () => {
    expect(getFromCache('missing')).toBeNull()
  })

  it('returns null and removes entry when expired', () => {
    saveToCache('key', 'value')

    vi.spyOn(Date, 'now').mockReturnValue(Date.now() + 2 * 60 * 60 * 1000)

    expect(getFromCache('key')).toBeNull()
    expect(localStorage.getItem('key')).toBeNull()

    vi.restoreAllMocks()
  })
})
