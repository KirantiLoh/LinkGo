import { useContext } from 'react'
import type { Link as LinkProps } from "@prisma/client"
import { FaChartBar, FaTrash } from "react-icons/fa";
import { DashboardContext } from 'src/context/DashboardContext';
import { api } from 'src/utils/api';

const LinkCard = ({
  id,
  name,
  show,
  clicks,
  url
}: LinkProps) => {

  const { links, setLinks } = useContext(DashboardContext);

  const toggleShow = api.link.toggleShow.useMutation({
    onSuccess: () => setLinks(links.map(link => link.id === id ? {...link, show: !link.show} : link))
  });

  const deleteLink = api.link.deleteLink.useMutation({
    onSuccess: () => setLinks(links.filter(link => link.id !== id))
  })

  return (
    <div className='flex flex-col gap-3 p-2'>
      <div className="flex flex-wrap items-center gap-4">
        <div className='flex-1'>
          <h4 className='font-semibold'>{name}</h4>
          <h4 className='opacity-90 max-w-[25ch] whitespace-nowrap overflow-hidden text-ellipsis'>{url}</h4>
        </div>
        <input type="checkbox" checked={show} onChange={() => {
          toggleShow.mutate({id: id, show: !show})
        }} name="" id="" />
        <FaTrash className='cursor-pointer' onClick={() => deleteLink.mutate({id})} />
      </div>
      <div className="flex items-center gap-3">
        <p className='opacity-80 flex items-center gap-1'><FaChartBar /> {clicks} Clicks</p>
      </div>
    </div>
  )
}

export default LinkCard