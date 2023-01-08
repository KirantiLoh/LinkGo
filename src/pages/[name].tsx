import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import Button from 'src/components/Button';
import LoadingScreen from 'src/components/LoadingScreen';
import NotFoundPage from 'src/components/NotFound';
import { api } from 'src/utils/api';

const UserPage = () => {

    const router = useRouter();

    const addVisitor = api.page.addVisitor.useMutation();

    const addClicks = api.link.addClick.useMutation();

    const { data: page, isLoading, isError } = api.page.getPageByName.useQuery({name: (router.query.name as string || "").toLocaleLowerCase()}, {
        enabled: !!router.query.name,
        retry: 1,
        refetchOnWindowFocus: false,
        onSuccess: (data) => addVisitor.mutate({name: data.name})
    });

    if (isLoading) return <LoadingScreen />

    if (isError) return <NotFoundPage />

    return (
        <>
        <Head>
            <title>{page.title} | LinkGo</title>
        </Head>
        <div style={{backgroundColor: page.bgColor, color: page.textColor}} className={`w-full min-h-screen`}>
            <div className="p-3 mx-auto flex flex-col items-center justify-start gap-5 pt-10 max-w-xl min-h-screen">
            <Image src={page.image || ""} alt={page.title} width={96} height={96} className="rounded-full" />
            <div className="flex flex-col items-center justify-center gap-1">
                <h1 className="font-semibold text-2xl">{page.title}</h1>
                <p className='max-w-[20ch] break-words '>{page.bio}</p>
            </div>
            <ul className='w-full flex-1 flex flex-col gap-4'>
                {page.links.map((link, index) => {
                    if (link.show) return (
                        <li key={index}>
                            <Button onClick={() => addClicks.mutate({id: link.id})} style={{borderColor: page.textColor, color: page.textColor}} color='secondary' href={link.url} target="_blank" rel='noreferrer'>
                                {link.name}
                            </Button>
                        </li>
                    )
                })}
            </ul>
            <Link href="/" style={{backgroundColor: page.bgColor}} className='pt-5 w-full flex items-center justify-center gap-2 text-xl'>
                <div className="w-6 h-6 relative">
                    <Image src="/logo.png" alt="LinkGo" fill />
                </div>
                LinkGo
            </Link>
            </div>
        </div>
        </>
    )
}

export default UserPage
