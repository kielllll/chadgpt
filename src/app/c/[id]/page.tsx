import Chat from '@/app/_components/chat'

export default function Conversation({ params }: { params: { id: string } }) {
  return <Chat conversationId={params.id || ''} />
}
