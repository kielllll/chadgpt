'use client'

import { useState } from 'react'
import Image from 'next/image'
import Message from '@/components/message'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { Form, FormField } from '@/components/ui/form'
import { useApikey } from '../_hooks/useApiKey'
import { flushSync } from 'react-dom'

type Message = {
  id: string
  conversationId: string
  role: string
  content: string
  createdAt: string
  updatedAt: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const apiKey = useApikey()
  const form = useForm()

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message])
  }

  const updateLastMessage = (content: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg, idx) =>
        idx === prevMessages.length - 1 ? { ...msg, content } : msg
      )
    )
  }

  const handleSendAction = async (formData: FormData) => {
    const message = formData.get('message') as string
    form.setValue('message', '')

    const newMessage = {
      id: crypto.randomUUID(),
      conversationId: crypto.randomUUID(),
      role: 'user',
      content: message,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    flushSync(() => {
      addMessage(newMessage)
    })

    const res = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey, messages: [...messages, newMessage] }),
    })

    if (res.body) {
      addMessage({
        id: crypto.randomUUID(), // TODO: use res.id
        conversationId: crypto.randomUUID(), // TODO: add conversation functionality
        role: 'assistant', // TODO: use res.role
        content: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      let content = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        content += decoder.decode(value)

        updateLastMessage(content)
      }
    }
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
