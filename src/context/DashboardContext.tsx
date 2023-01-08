import type { Link } from '@prisma/client';
import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { createContext, useState } from 'react'

export const DashboardContext = createContext<{
  links: Link[]
  setLinks: Dispatch<SetStateAction<Link[]>>
}>({
  links: [],
  setLinks: undefined as unknown as Dispatch<SetStateAction<Link[]>>
});

export const DashboardProvider = ({children}: {children: ReactNode}) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [links, setLinks] = useState<Link[]>([]);

  const contextValue = {
    links,
    setLinks
  }

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  )
}
