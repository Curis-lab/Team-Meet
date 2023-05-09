import { useRef, useState } from "react"

interface props{
    onChange?: (file: File)=> any,
    imageUrl?: string
}

export const IamgeUploader = ({onChange, imageUrl}: props)=>{

    const [draggingOver, setDraggingOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const dropRef = useRef(null);


    const preventDefaults = (e: React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault()
        e.stopPropagation()
    }

    return(
    <div
    className={`${draggingOver ? 'border-4 border-dashed border-yellow-300 border-rounded': ''} group rounded-full relative w-24 h-24 flex justify-center`}
    >
        <input type="file"/>
    </div>)
}