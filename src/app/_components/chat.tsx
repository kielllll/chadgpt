'use client'

import { useState } from 'react'
import Image from 'next/image'
import Message from '@/components/message'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { Form, FormField } from '@/components/ui/form'
import { useApikey } from '../_hooks/useApiKey'
import { send } from '@/server/conversation'

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([])
  const apiKey = useApikey()
  const form = useForm()

  const handleSendAction = async (formData: FormData) => {
    const message = formData.get('message') as string

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: crypto.randomUUID(),
        conversationId: crypto.randomUUID(),
        role: 'user',
        content: message,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])

    const res = await send(apiKey, [
      ...messages.map(({ role, content }) => ({ role, content })),
      {
        role: 'user',
        content: message,
      },
    ])

    console.log('chat.tsx: DEBUG ====== ', res)

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        messageId: res.id,
        conversationId: crypto.randomUUID(),
        role: res?.role || 'assistant',
        content: res?.content || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])

    form.setValue('message', '')
  }

  return (
    <section className="flex flex-col p-4 w-full">
      {messages.length > 0 ? (
        <div className="flex flex-col">
          {messages.map((message) => (
            <Message
              className={message.role === 'user' ? 'ml-auto' : ''}
              key={message.id}
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
      <Form {...form}>
        <form
          className="mt-auto flex items-center gap-2 w-full"
          action={handleSendAction}
        >
          <FormField
            control={form.control}
            name="message"
            render={() => (
              <Textarea
                rows={1}
                className="min-h-10"
                {...form.register('message')}
              />
            )}
          />

          <Button type="submit" className="bg-black" disabled={!apiKey}>
            Send
          </Button>
        </form>
      </Form>
    </section>
  )
}
