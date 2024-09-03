'use client'

import { BsLayoutSidebar } from 'react-icons/bs'
import { Button } from '@/components/ui/button'
import Settings from './settings'
import { useGetConversations } from '../_hooks/useGetConversations'
import Link from 'next/link'

export default function SideBar() {
  const { data: conversations } = useGetConversations()

  return (
    <aside className="sm:w-1/5 border-r-[1px] hidden sm:block max-h-screen overflow-y-auto">
      <div className="w-full flex flex-col gap-4 bg-slate-100 py-4 px-6">
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
          <Settings />
        </div>
        <h2>Conversations</h2>
      </div>
      <div className="w-full flex flex-col gap-4 py-4 px-2">
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
