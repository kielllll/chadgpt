import Head from "next/head";
import { AiFillGithub } from "react-icons/ai";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>chadGPT</title>
        <meta name="description" content="A personal chatGPT tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] p-3">
        {children}
        <footer className="mt-auto flex w-full items-center justify-center gap-4 p-2 text-white">
          <p className="text-pearl">© Ezekiel Tarranza 🤖 - 2023</p>
          <a href="https://github.com/kielllll/chadgpt" target="_blank">
            <AiFillGithub className="text-white" size={24} />
          </a>
        </footer>
      </main>
    </>
  );
}

export default RootLayout;
