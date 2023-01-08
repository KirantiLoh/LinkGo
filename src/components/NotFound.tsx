import Image from 'next/image'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <main className="w-full h-screen flex items-center justify-center flex-col gap-3 bg-gradient-to-l from-indigo-700 via-indigo-900 to-sky-900">
        <h1 className="text-5xl font-bold text-white">
            <Link href="/" className='flex items-center gap-1'>
                <Image src="/logo.png" alt="LinkGo" width={48} height={48} />
                LinkGo
            </Link>
        </h1>
        <h1 className="text-white text-xl max-w-[20ch] sm:max-w-full text-center font-semibold">The page you&apos;re looking doesn&apos;t exist</h1>
    </main>
  )
}

export default NotFoundPage