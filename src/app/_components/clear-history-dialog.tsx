'use client'

import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { AiOutlineClear } from 'react-icons/ai'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { removeConversationsByUserId } from '@/server/conversation'

export default function ClearHistoryDialog({ apiKey }: { apiKey: string }) {
  const [opened, setOpened] = useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()

  const handleClear = async () => {
    await removeConversationsByUserId(apiKey)
    queryClient.invalidateQueries({
      queryKey: ['conversations', apiKey],
    })
    setOpened(false)
    router.push('/')
  }

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger className="w-full" asChild>
        <DropdownMenuItem
          aria-label="Clear Conversations"
          onClick={(event) => {
            // prevent the menu from closing
            event.preventDefault()
            setOpened(true)
          }}
        >
          <AiOutlineClear size={18} className="mr-2" />
          <span>Clear Conversations</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="max-w[400px]">
        <DialogTitle className="text-xl">Clear Conversations</DialogTitle>
        <DialogDescription>
          Are you sure you want to clear all conversations on this associated
          account (API Key / AI Model)?
        </DialogDescription>
        <div className="mt-2 flex justify-end items-center gap-2">
          <Button onClick={() => setOpened(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
