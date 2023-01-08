import type { ReactNode } from 'react';
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface ContainerProps {
    title: string
    children: ReactNode
}

const Container = ({title, children}: ContainerProps) => {

    const [show, setShow] = useState(true)

  return (
    <div className={`flex flex-col ${show ? "gap-3 p-3 pt-1" : "gap-0 px-3 py-1"} transition-all duration-300 rounded-xl bg-primary-800`}>
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold py-2">{title}</h3>
            <div className='cursor-pointer text-xl' onClick={() => setShow(!show)}>
                {show ? <FaEye /> : <FaEyeSlash /> }
            </div>
        </div>
        <div className={`flex flex-col gap-3 transition-all duration-300 overflow-hidden ${show ? "max-h-screen" : "max-h-0"}`}>
            {children}
        </div>
    </div>
  )
}

export default Container