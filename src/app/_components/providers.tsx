'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'jotai'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>{children}</Provider>
    </QueryClientProvider>
  )
}
