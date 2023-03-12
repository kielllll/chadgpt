import Head from "next/head";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>chadGPT</title>
        <meta name="description" content="A personal chatGPT tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
};

export default Layout;
