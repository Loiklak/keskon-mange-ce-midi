'use client'

import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'

export const ReactQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient()
  )
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}