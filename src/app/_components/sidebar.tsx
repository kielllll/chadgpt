'use client'

import Link from 'next/link'
import { useAtomValue } from 'jotai'
import { BsLayoutSidebar } from 'react-icons/bs'
import { BiMessageRoundedAdd } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
import Settings from './settings'
import { useGetConversations } from '../_hooks/useGetConversations'
import { apiKeyAtom } from '@/lib/atoms'

export default function SideBar() {
  const apiKey = useAtomValue(apiKeyAtom) || ''
  const { data: conversations } = useGetConversations(apiKey)

  return (
    <aside className="sm:w-3/12 border-r-[1px] hidden sm:block max-h-screen overflow-y-auto">
      <div className="w-full flex flex-col gap-4 bg-slate-100 p-4">
        <div className="flex w-full justify-end items-center gap-1">
          <h1 className="text-2xl font-bold mr-auto">ChadGPT</h1>
          <Button
            variant="ghost"
            size="icon"
            className="bg-inherit hover:bg-slate-200"
            aria-label="Toggle Sidebar"
          >
            <BsLayoutSidebar size={24} />
          </Button>
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="bg-inherit hover:bg-slate-200"
              aria-label="Toggle Sidebar"
            >
              <BiMessageRoundedAdd size={24} />
            </Button>
          </Link>
          <Settings />
        </div>
        <h2>Conversations</h2>
      </div>
      <div className="w-full flex flex-col gap-4 py-4">
        {conversations?.map((conversation) => (
          <Link
            key={conversation.id}
            href={`/c/${conversation.id}`}
            className="hover:bg-gray-300 p-4 rounded-lg"
          >
            {conversation.title}
          </Link>
        ))}
      </div>
    </aside>
  )
}
