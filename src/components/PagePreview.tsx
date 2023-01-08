import type { Link as ILink } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from './Button'

interface PagePreviewProps {
    bgColor: string
    textColor: string
    image: string
    title: string
    bio?: string
    links: ILink[]
}

const PagePreview = ({
    bgColor,
    image,
    title,
    bio,
    links,
    textColor
}: PagePreviewProps) => {
    return (
        <div style={{backgroundColor: bgColor, color: textColor}} className={`before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[120px] before:h-5 before:bg-gray-900 before:rounded-b-xl relative rounded-3xl border-8 border-gray-900 w-[240px] h-[490px] aspect-[0.4897959183673469] overflow-y-hidden`}>
            <div className="preview p-3 flex flex-col items-center justify-start gap-3 pt-10 h-full overflow-y-auto">
            <Image src={image} alt={title} width={54} height={54} className="rounded-full" />
            <div className="flex flex-col items-center justify-center gap-1">
                <h1 className="font-semibold text-2xl">{title}</h1>
                <p className='max-w-[20ch] break-words '>{bio}</p>
            </div>
            <ul className='w-full flex-1 flex flex-col gap-1.5'>
                {links.map((link, index) => {
                    if (link.show) return (
                        <li key={index}>
                            <Button style={{borderColor: textColor, color: textColor}} className='text-sm py-1.5' color='secondary' href={link.url} target="_blank" rel='noreferrer'>
                                {link.name}
                            </Button>
                        </li>
                    )
                })}
            </ul>
            <Link href="/" style={{backgroundColor: bgColor}} className='pt-5 w-full flex items-center justify-center gap-2 '>
                <div className="w-6 h-6 relative">
                    <Image src="/logo.png" alt="LinkGo" fill />
                </div>
                LinkGo
            </Link>
            </div>
        </div>
    )
}

export default PagePreview
