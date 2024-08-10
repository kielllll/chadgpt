import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuUnplug } from 'react-icons/lu'
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

export default function ApiKeyDialog() {
  const [opened, setOpened] = useState(false)
  const form = useForm()

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
          <form className="flex flex-col">
            <FormField
              control={form.control}
              name="apiKey"
              render={() => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input
                      type="text"
                      className="focus:!ring-0 focus:border-primary"
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
