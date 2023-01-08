import { useState, useContext } from 'react'
import type { SyntheticEvent } from "react";
import { FaTimes } from 'react-icons/fa';
import Button from './Button';
import { api } from 'src/utils/api';
import { DashboardContext } from 'src/context/DashboardContext';

const CreateLinkForm = ({
    show,
    onClose
}: {
    show: boolean
    onClose: () => void
}) => {

    const [linkName, setLinkName] = useState("");
    const [URL, setURL] = useState("");

    const { links, setLinks } = useContext(DashboardContext);

    const createLink = api.link.createLink.useMutation({
        onSuccess(data) {
            setLinkName("");
            setURL("");
            setLinks([data, ...links])
            onClose();
        },
    });

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (!linkName || !URL) return;
        createLink.mutate({
            name: linkName,
            url: URL
        });
    }

  return (
    <form onSubmit={handleSubmit} className={`${!show ? "max-h-0 -my-2" : "max-h-screen"} transition-all duration-300 overflow-hidden flex flex-col gap-3`}>
        <div className="flex items-center justify-between">
            <h3 className='font-semibold text-lg'>Add New Link</h3>
            <FaTimes className='text-xl cursor-pointer' onClick={onClose} />
        </div>
        <input className='w-full text-black p-3 outline-none rounded-md' placeholder='Name' type="text" id="title" value={linkName} onChange={e => setLinkName(e.target.value)} />
        <input className='w-full text-black p-3 outline-none rounded-md' placeholder='URL' type="text" id="title" value={URL} onChange={e => setURL(e.target.value)} />
        <Button disabled={!linkName || !URL} className='' color='primary'>
            Add
        </Button>
    </form>
  )
}

export default CreateLinkForm