import { memo } from 'react'
import Image from 'next/image'
import Message from '@/components/message'

type Message = {
  id: string
  conversationId: string
  role: string
  content: string
  createdAt: string
  updatedAt: string
}

interface MessagesProps {
  messages: Message[]
  apiKey: string
}

function Messages(props: MessagesProps) {
  if (props.messages.length === 0) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="h-[250px] w-[250px] relative">
          <Image
            src={'/chad-no-messages.png'}
            alt="Chad"
            objectFit="cover"
            fill
          />
        </div>
        <p className="text-primary">
          {props.apiKey
            ? 'Start a conversation'
            : 'Setup your API key in the settings'}
          , King 👑
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4 h-full overflow-y-auto">
      {props.messages.map((message) => (
        <Message
          className={message.role === 'user' ? 'ml-auto' : ''}
          key={message.id}
          {...message}
        />
      ))}
    </div>
  )
}

export default memo(Messages)
