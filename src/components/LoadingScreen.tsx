import Image from 'next/image'

const LoadingScreen = () => {
  return (
    <main className="w-full h-screen flex items-center justify-center flex-col gap-3 bg-gradient-to-l from-indigo-700 via-indigo-900 to-sky-900">
        <h1 className="text-5xl font-bold text-white flex items-center gap-1">
            <Image src="/logo.png" alt="LinkGo" width={48} height={48} />
            LinkGo
        </h1>
        <h2 className="text-white text-xl">Loading...</h2>
    </main>
  )
}

export default LoadingScreen