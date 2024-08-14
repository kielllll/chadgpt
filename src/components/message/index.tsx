import { cn, formatISO } from '@/lib/utils'
import { memo } from 'react'

interface MessageProps {
  id: string
  conversationId: string
  role: 'user' | 'assistant' | 'system' | (string & {})
  content: string
  metadata?: string
  createdAt: string
  updatedAt: string | number
  className?: string
}

function Message(props: MessageProps) {
  const isUser = props.role === 'user'

  return (
    <div
      className={cn(
        'w-fit py-2 px-4 max-w-[70%] rounded-lg',
        props.className,
        isUser ? 'bg-primary' : 'bg-secondary'
      )}
    >
      <p className={cn('text-sm', isUser ? 'text-secondary' : 'text-primary')}>
        {props.content}
      </p>
      <span className="text-xs text-muted-foreground">
        {formatISO(props.createdAt)}
      </span>
    </div>
  )
}

export default memo(Message)
