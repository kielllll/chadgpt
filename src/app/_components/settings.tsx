'use client'

import { useState, useEffect } from 'react'
import { GoGear } from 'react-icons/go'
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'
import ApiKeyDialog from './api-key-dialog'
import ClearHistoryDialog from './clear-history-dialog'
import { setModel as dbSetModel } from '@/server/apikey'

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
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('gpt-4o-mini')

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey') || ''

    if (apiKey) {
      setApiKey(apiKey)
    }
  }, [])

  const handleModelSelect = async (value: string) => {
    const res = await dbSetModel(apiKey, value)

    if (res) {
      setModel(value)
    }
  }

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
        <DropdownMenuRadioGroup value={model} onValueChange={handleModelSelect}>
          {MODELS.map(({ name, value }) => (
            <DropdownMenuRadioItem
              key={value}
              value={value}
              aria-label={name}
              disabled={!apiKey}
            >
              {name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-lg">
          General Settings
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <ApiKeyDialog apiKey={apiKey} />
          <ClearHistoryDialog />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
