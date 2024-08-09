import SideBar from './_components/sidebar'
import Chat from './_components/chat'

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <SideBar />
      <Chat />
    </main>
  )
}
