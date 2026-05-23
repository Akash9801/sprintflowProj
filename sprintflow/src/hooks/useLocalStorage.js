import { useState, useCallback } from 'react'

/**
 * useState but persisted to localStorage.
 * Handles JSON serialization and parse errors gracefully.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (err) {
        console.warn(`useLocalStorage: failed to set "${key}"`, err)
      }
    },
    [key, storedValue]
  )

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (err) {
      console.warn(`useLocalStorage: failed to remove "${key}"`, err)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}
