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
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'
import { AiOutlineClear } from 'react-icons/ai'
import ApiKeyDialog from './api-key-dialog'

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
        <DropdownMenuLabel className="text-lg">AI Models</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
          {MODELS.map(({ name, value }) => (
            <DropdownMenuRadioItem key={value} value={value} aria-label={name}>
              {name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-lg">
          General Settings
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <ApiKeyDialog />
          <DropdownMenuItem aria-label="Clear Conversations">
            <AiOutlineClear size={18} className="mr-2" />
            <span>Clear Conversations</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
