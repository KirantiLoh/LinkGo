import Image from 'next/image'
import React from 'react'
import Button from './Button'
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';

const Navbar = ({className}: {className?: string}) => {

  const { data: session } = useSession();

  return (
    <nav className={`bg-gradient-to-l from-indigo-700 via-indigo-900 to-sky-900 sticky top-0 left-0 w-full flex items-center justify-between gap-3 p-3 ${className || ""}`}>
    <h1 className="text-3xl font-bold text-white">
        <Link href="/" className='flex items-center gap-1'>
            <Image src="/logo.png" alt="LinkGo" width={45} height={45} />
            LinkGo
        </Link>
    </h1>
    <ul>
      <li>
      </li>
        {
          session ? 
            <li>
              <Button color="secondary" onClick={() => signOut({callbackUrl: "/"})}>
                Sign out
              </Button>
            </li>
          :
          <li>
            <Button color="secondary" onClick={() => signIn("discord", {callbackUrl: "/dashboard"})}>
              Sign In
            </Button>
          </li>
        }
    </ul>
</nav>
  )
}

export default Navbar