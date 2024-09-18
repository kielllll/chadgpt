'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Message from '@/components/message'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { Form, FormField } from '@/components/ui/form'
import { flushSync } from 'react-dom'
import { useAtomValue } from 'jotai'
import { apiKeyAtom } from '@/lib/atoms'
import { addConversation } from '@/server/conversation'
import { useGetMessagesByConversationId } from '../_hooks/useGetMessagesByConversationId'
import { addMessages } from '@/server/message'
import { useQueryClient } from '@tanstack/react-query'
import Messages from './messages'

type Message = {
  id: string
  conversationId: string
  role: string
  content: string
  createdAt: string
  updatedAt: string
}

export default function ChatArea({
  conversationId = '',
}: {
  conversationId: string
}) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [messages, setMessages] = useState<Message[]>([])
  const apiKey = useAtomValue(apiKeyAtom)
  const form = useForm()
  const { data: messagesData } = useGetMessagesByConversationId(
    conversationId
  ) as unknown as {
    data: Message[] | undefined
  }

  useEffect(() => {
    if (messagesData && messagesData.length > 0) {
      setMessages(messagesData)
    }
  }, [messagesData])

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

  const send = async (message: string) => {
    // reset form value
    form.reset()
    let baseConversationId = conversationId

    // create a conversation if there are no messages
    if (messages.length === 0 || conversationId === '') {
      const newConversation = (await addConversation({
        userId: apiKey,
        title: message,
      })) as unknown as {
        id: string
      }

      baseConversationId = newConversation.id
    }

    const newMessage = {
      id: crypto.randomUUID(),
      conversationId: baseConversationId,
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
      let reply = {
        id: crypto.randomUUID(), // TODO: use res.id
        conversationId: baseConversationId,
        role: 'assistant', // TODO: use res.role
        content: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      addMessage(reply)

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      let content = ''

      // process stream
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        content += decoder.decode(value)
        reply.content = content

        updateLastMessage(content)
      }

      // add last two messages to database
      addMessages([newMessage, reply])
    }

    // redirect to conversation page if conversationId is empty
    if (conversationId === '') {
      // @ts-expect-error 'shallow' does not exist in type 'NavigateOptions'
      router.push(`/c/${baseConversationId}`, { shallow: true })
      queryClient.invalidateQueries({
        queryKey: ['conversations', apiKey],
      })
    }
  }

  const handleSendAction = async (formData: FormData) => {
    const message = formData.get('message') as string

    await send(message)
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && form.getValues('message') !== '') {
      e.preventDefault()
      await send(form.getValues('message'))
    }
  }

  return (
    <section className="flex flex-col w-full gap-2 h-screen pb-4">
      <Messages messages={messages} apiKey={apiKey} />
      <Form {...form}>
        <form
          className="mt-auto flex mx-auto gap-2 w-1/2"
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
                onKeyDown={handleKeyDown}
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
