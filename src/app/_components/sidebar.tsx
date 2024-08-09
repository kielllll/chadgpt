import { BsLayoutSidebar } from 'react-icons/bs'
import { GoGear } from 'react-icons/go'
import { Button } from '@/components/ui/button'

export default function SideBar() {
  return (
    <aside className="sm:w-1/5 border-r-[1px] hidden sm:block">
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
          <Button
            variant="ghost"
            size="icon"
            className="bg-inherit hover:bg-slate-200"
            aria-label="Settings"
          >
            <GoGear size={24} />
          </Button>
        </div>
        <h2>Conversations</h2>
      </div>
    </aside>
  )
}
