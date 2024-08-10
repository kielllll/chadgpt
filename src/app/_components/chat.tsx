import Image from 'next/image'
import Message from '@/components/message'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { DUMMY } from '@/lib/utils'

export default function Chat() {
  return (
    <section className="flex flex-col p-4 w-full">
      {DUMMY.length > 0 ? (
        <div className="flex flex-col">
          {DUMMY.map((message) => (
            <Message
              className={message.role === 'user' ? 'ml-auto' : ''}
              key={message.messageId}
              {...message}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col h-full items-center justify-center">
          <div className="h-[250px] w-[250px] relative">
            <Image
              src={'/chad-no-messages.png'}
              alt="Chad"
              objectFit="cover"
              fill
            />
          </div>
          <p className="text-primary">Start a conversation, King 👑</p>
        </div>
      )}
      <form className="mt-auto flex items-center gap-2 w-full">
        <Textarea rows={1} className="min-h-10" />
        <Button className="bg-black">Send</Button>
      </form>
    </section>
  )
}
