'use client'

import { useEffect, useState } from 'react'

export function useApikey() {
  const [apiKey, setApiKey] = useState('')

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey') || ''

    if (apiKey) {
      setApiKey(apiKey)
    }
  }, [])

  return apiKey
}
