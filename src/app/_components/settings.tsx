'use client'

import { useState } from 'react'
import { GoGear } from 'react-icons/go'
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { LuUnplug } from 'react-icons/lu'
import { AiOutlineClear } from 'react-icons/ai'

const MODELS = [
  {
    name: 'GPT-3.5 Turbo',
    value: 'gpt-3.5-turbo',
  },
  {
    name: 'GPT-4o',
    value: 'gpt-4o',
  },
  {
    name: 'GPT-4o Mini',
    value: 'gpt-4o-mini',
  },
  {
    name: 'GPT-4-turbo',
    value: 'gpt-4-turbo',
  },
]

export default function Settings() {
  const [model, setModel] = useState('gpt-4o-mini')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="bg-inherit hover:bg-slate-200 p-2 rounded-md"
        aria-label="Settings"
      >
        <GoGear size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>AI Models</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
          {MODELS.map(({ name, value }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>General Settings</DropdownMenuLabel>
        <DropdownMenuItem>
          <LuUnplug size={18} className="mr-2" />
          <span>Add API Key</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <AiOutlineClear size={18} className="mr-2" />
          <span>Clear Conversations</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
