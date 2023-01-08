import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useContext } from 'react'
import { FaChartBar, FaEye, FaTimes } from 'react-icons/fa';
import Button from 'src/components/Button';
import Container from 'src/components/Container';
import CreateLinkForm from 'src/components/CreateLinkForm';
import LinkCard from 'src/components/LinkCard';
import LoadingScreen from 'src/components/LoadingScreen';
import Navbar from 'src/components/Navbar';
import PagePreview from 'src/components/PagePreview';
import { DashboardContext } from 'src/context/DashboardContext';
import { api } from 'src/utils/api';

const DashboardPage = () => {

    const { data: session } = useSession({
        required: true,
        onUnauthenticated: () => signIn("discord")
    });

    const router = useRouter();

    const [bgColor, setBgColor] = useState("#6365f1");
    const [textColor, setTextColor] = useState("#fff");

    const [title, setTitle] = useState("");
    const [bio, setBio] = useState("");

    const { links, setLinks } = useContext(DashboardContext);


    const [showPreview, setShowPreview] = useState(false);
    const [showCreateLink, setShowCreateLink] = useState(false);

    const { data: page, isLoading, isError } = api.page.getUserPage.useQuery(undefined, {
        onError(err) {
          if(err.message === "No Page found") router.replace("/get-started")
        },
        onSuccess(data) {
            setTitle(data.title);
            setBio(data.bio || "");
            setBgColor(data.bgColor);
            setTextColor(data.textColor);
            setLinks(data.links);
        },
        retry: 1,
    });

    const mutation = api.page.updatePage.useMutation({
        onSuccess(data) {
            setTitle(data.title);
            setBio(data.bio || "");
            setBgColor(data.bgColor);
            setTextColor(data.textColor);
        },
    })

    const handleClick = () => {
        if (!title || !bgColor || !textColor) return;
        if (title === page?.title && bio === page?.bio && bgColor === page?.bgColor && textColor === page?.textColor) return;
        mutation.mutate({
            title,
            bio,
            bgColor,
            textColor,
        });
    }

    if (!session || isLoading || isError) return <LoadingScreen />
    return (
        <>
            <Head>
              <title>Dashboard | LinkGo</title>
              <meta name="description" content="All your links in one place" />
            </Head>
            <Navbar />
            <main className="w-full min-h-[calc(100vh-76px)] overflow-hidden flex bg-secondary-900 text-white">
                <section className='w-full flex justify-between items-center'>
                    <aside className='h-[calc(100vh-76px)] overflow-y-auto flex flex-col gap-4 self-start flex-1 p-5'>
                        <Container title='Analytics'>
                            <div className="flex flex-wrap items-center gap-4">
                                <p className='flex items-center gap-2'><FaEye /> {page.visitor} Views</p>
                                <p className='flex items-center gap-2'><FaChartBar /> {page && page.links.reduce((total, val) => total + val.clicks, 0)} Clicks</p>
                            </div>
                        </Container>
                        <Container title='Profile'>
                            <input className='text-black p-3 outline-none rounded-md' placeholder='Title' type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />
                            <textarea className='text-black p-3 outline-none resize-y rounded-md min-h-[80px]' rows={3} placeholder='Bio' id="bio" value={bio} onChange={e => setBio(e.target.value)} />
                        </Container>
                        <Container title='Appearance'>
                            <label htmlFor="bgColor">Background Color</label>
                            <div className="flex items-center gap-2">
                                <label htmlFor="bgColor" style={{backgroundColor: bgColor}} className='block w-8 h-8 rounded-full'>
                                    <input type="color" id='bgColor' value={bgColor} onChange={e => setBgColor(e.target.value)} />
                                </label>
                                <input type="text" className='text-black px-1.5 py-1 outline-none rounded-md max-w-[9ch]' value={bgColor} onChange={e => setBgColor(e.target.value)} />
                            </div>
                            <label htmlFor="textColor">Text Color</label>
                            <div className="flex items-center gap-2">
                                <label htmlFor="textColor" style={{backgroundColor: textColor}} className='block w-8 h-8 rounded-full'>
                                    <input type="color" id='textColor' value={textColor} onChange={e => setTextColor(e.target.value)} />
                                </label>
                                <input type="text" className='text-black px-1.5 py-1 outline-none rounded-md max-w-[9ch]' value={textColor} onChange={e => setTextColor(e.target.value)} />
                            </div>
                        </Container>
                        <Container title='Links'>
                            <CreateLinkForm show={showCreateLink} onClose={() => setShowCreateLink(false)} />
                            <Button onClick={() => setShowCreateLink(true)} color='primary' className={`my-2 ${showCreateLink ? "hidden" : ""}`}>
                                Add Link
                            </Button>
                            {links.length > 0 &&
                                <ul className='flex flex-col gap-3'>
                                    {links.map((link, index) => {
                                        return (
                                            <li key={index}>
                                                <LinkCard 
                                                    id={link.id}
                                                    clicks={link.clicks}
                                                    name={link.name}
                                                    url={link.url}
                                                    pageId={page.userId}
                                                    show={link.show}
                                                    createdAt={link.createdAt}
                                                />
                                            </li>
                                        )
                                    })}
                                </ul>
                            }
                        </Container>
                        <Button className='' disabled={!title || !bgColor || !textColor || title === page?.title && bio === page?.bio && bgColor === page?.bgColor && textColor === page?.textColor} onClick={handleClick} color='primary'>
                            Save
                        </Button>
                        <Button color='secondary' onClick={() => setShowPreview(true)} className={`shadow-lg sm:hidden`}>
                            <FaEye /> Preview
                        </Button>
                    </aside>
                    <aside className={`px-5 md:px-10 py-4 transition-all duration-700 ease-in-out fixed top-0 ${showPreview ? "left-0" : "-left-[150%]"} w-full h-screen sm:h-[calc(100vh-76px)] bg-secondary-900 sm:w-auto sm:static lg:w-2/5 flex flex-col gap-3 sm:justify-center items-center`}>
                        <PagePreview 
                            bgColor={bgColor}
                            textColor={textColor}
                            image={session?.user?.image || "/logo.png"}
                            title={title || "Title"}
                            bio={bio || "Bio"}
                            links={links}
                        />
                         <Button color='primary' onClick={() => setShowPreview(false)} className={`shadow-lg w-max sm:hidden aspect-square`}>
                            <FaTimes/>
                        </Button>
                    </aside>
                </section>
                
            </main>
        </>
    );
}

export default DashboardPage;
