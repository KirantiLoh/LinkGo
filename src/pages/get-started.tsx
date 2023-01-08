import { useState, useEffect } from 'react'
import type { SyntheticEvent } from "react";
import { api } from 'src/utils/api';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';
import Navbar from 'src/components/Navbar';
import Button from 'src/components/Button';
import LoadingScreen from 'src/components/LoadingScreen';

const GetStartedPage = () => {

  const router = useRouter();

  const mutation = api.page.createPage.useMutation({
    onSuccess: () => router.replace("/dashboard")
  });

  const { isLoading, isSuccess } = api.page.getUserPage.useQuery(undefined, {
    retry: 1,
    onSuccess: () => router.replace("/dashboard")
  })

  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => signIn("discord", {callbackUrl: "/get-started"})
  })

  const [name, setName] = useState("");

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name.toLocaleLowerCase())
  }, [session?.user?.name])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    mutation.mutate({name: name})
  }

  if (isLoading || isSuccess) return <LoadingScreen />

  return (
  <>
    <Head>
      <title>Get Started | LinkGo</title>
      <meta name="description" content="All your links in one place" />
    </Head>
    <Navbar />
    <main className="w-full h-[calc(100vh-76px)] flex items-center justify-center flex-col bg-gradient-to-l from-indigo-700 via-indigo-900 to-sky-900">
      <form onSubmit={handleSubmit} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 text-white flex flex-col gap-4">
        <h1 className='text-3xl font-semibold'>Welcome {session?.user?.name}</h1>
        <div>
          <p className='mb-2'>What would be the name for your page?</p>
          <div className="flex bg-white rounded-md">
            <p className="p-3 pr-0 rounded-l-md bg-white text-black border-none">{`${window.location.host}/` || "linkgo.vercel.app/"}</p>
            <input type="text" value={name} onChange={e => setName(e.target.value.toLocaleLowerCase())} className="w-full text-black p-3 pl-0.5 outline-none rounded-r-md" />
          </div>
        </div>
        <Button disabled={!name} color='primary'>
          Submit
        </Button>
      </form>        
    </main>
  </>
  )
}

export default GetStartedPage