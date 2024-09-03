import { getMessagesByConversationId } from '@/server/message'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export function useGetMessagesByConversationId(
  conversationId: string,
  options?: UseQueryOptions
) {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      return await getMessagesByConversationId(conversationId)
    },
    enabled: !!conversationId,
    ...options,
  })
}
