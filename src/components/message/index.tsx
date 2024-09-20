import { cn, formatISO } from '@/lib/utils'
import { memo } from 'react'
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

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
      <Markdown
        className={cn('text-sm', isUser ? 'text-secondary' : 'text-primary')}
        components={{
          code({ className, children, ref, style, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <SyntaxHighlighter
                language={match[1]}
                customStyle={{ padding: '10px', borderRadius: '5px' }}
                PreTag="div"
                {...props}
                style={dark}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {props.content}
      </Markdown>
      <span className="text-xs text-muted-foreground">
        {formatISO(props.createdAt)}
      </span>
    </div>
  )
}

export default memo(Message)
