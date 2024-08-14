'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuUnplug } from 'react-icons/lu'
import { useSetAtom } from 'jotai'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { addApiKey } from '@/server/apikey'
import { apiKeyAtom } from '@/lib/atoms'

export default function ApiKeyDialog({ apiKey }: { apiKey: string }) {
  const [opened, setOpened] = useState(false)
  const setApiKey = useSetAtom(apiKeyAtom)

  const form = useForm<{
    apiKey: string
  }>()

  const handleSubmit = async (formData: FormData) => {
    const res = await addApiKey(formData.get('apiKey') as string)

    if (res) {
      setApiKey(res)
      setOpened(false)
    }
  }

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger className="w-full" asChild>
        <DropdownMenuItem
          aria-label="Add API Key"
          onClick={(event) => {
            // prevent the menu from closing
            event.preventDefault()
            setOpened(true)
          }}
        >
          <LuUnplug size={18} className="mr-2" />
          <span>Add API Key</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="max-w[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add API Key</DialogTitle>
          <DialogDescription>
            Adding an API key allows you to use the chat application. This also
            means you are authorized as a user which will store the
            conversations. It will only store if the API key is valid.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col" action={handleSubmit}>
            <FormField
              control={form.control}
              name="apiKey"
              render={() => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input
                      type="text"
                      name="apiKey"
                      className="focus:!ring-0 focus:border-primary"
                      defaultValue={apiKey}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-2 flex justify-end items-center gap-2">
              <Button onClick={() => setOpened(false)}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
