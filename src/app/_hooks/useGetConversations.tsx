import { getConversations } from '@/server/conversation'
import { useQuery } from '@tanstack/react-query'

export function useGetConversations() {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      return await getConversations()
    },
  })
}
