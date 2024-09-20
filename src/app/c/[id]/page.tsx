import ChatArea from '@/app/_components/chat-area'

export default function Conversation({ params }: { params: { id: string } }) {
  return <ChatArea conversationId={params.id || ''} />
}
