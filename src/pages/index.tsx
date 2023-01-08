import { type NextPage } from "next";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import Button from "src/components/Button";
import PagePreview from "src/components/PagePreview";
import Navbar from "src/components/Navbar";


const Home: NextPage = () => {

  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>LinkGo - All your links in one place</title>
        <meta name="description" content="All your links in one place" />
      </Head>
      <main className="flex items-center justify-center flex-col bg-gradient-to-l from-indigo-700 via-indigo-900 to-sky-900">
        <Navbar />
        <section className="p-6 px-8 w-full min-h-[calc(100vh-76px)] flex justify-evenly items-center flex-col md:flex-row gap-20">
          <aside className="flex flex-col gap-6">
            <h1 className="text-white text-4xl md:text-6xl !leading-[1.25] font-extrabold max-w-[15ch]">
              Connecting others to you in a single page
            </h1>
            {
              session ? 
                  <Button color="primary" href="/dashboard">
                    Dashboard
                  </Button>
              :
                <Button color="primary"  onClick={() => signIn("discord", {callbackUrl: "/dashboard"})}>
                  Join now
                </Button>
            }
          </aside>
          <aside className="grid place-items-center p-3">
            <PagePreview
              bgColor="#6365f1"
              textColor="#fff"
              image="/logo.png"
              title="LinkGo"
              bio="Creator: Maurice Yang"
              links={[
                {pageId: "A", id: "1", clicks: 0,name: "Github", url: "https://github.com/KirantiLoh", show: true, createdAt: new Date()},
                {pageId: "A", id: "2", clicks: 0,name: "Twitter", url: "https://twitter.com/ImMauriceYang", show: true, createdAt: new Date()},
                {pageId: "A", id: "3", clicks: 0,name: "Instagram", url: "https://www.instagram.com/maurice_yang/", show: true, createdAt: new Date()},
              ]}
            />
          </aside>
        </section>
      </main>
    </>
  );
};

export default Home;
// rgb(99 102 241 