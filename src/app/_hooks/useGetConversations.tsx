import { getConversationsByUserId } from '@/server/conversation'
import { useQuery } from '@tanstack/react-query'

export function useGetConversations(userId: string) {
  return useQuery({
    queryKey: ['conversations', userId],
    queryFn: async ({ queryKey }) => {
      return await getConversationsByUserId(queryKey[1] || '')
    },
    enabled: !!userId && userId !== '',
  })
}
