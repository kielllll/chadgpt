import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function Chat() {
  return (
    <section className="flex flex-col p-4 items-center w-full">
      <div>messages</div>
      <form className="mt-auto flex items-center gap-2 w-full">
        <Textarea rows={1} className="min-h-10" />
        <Button className="bg-black">Send</Button>
      </form>
    </section>
  )
}
