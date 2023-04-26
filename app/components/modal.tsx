import React from 'react'
import { Portal } from './portal';
import { useNavigate } from '@remix-run/react';

interface props{
    isOpen: boolean
    children: React.ReactElement
    className?:string
    ariaLabel?:string
}

const Modal: React.FC<props> = ({ariaLabel,isOpen, children, className}) =>{
    const navigate = useNavigate();
    if(!isOpen ) return null;
  return (
    <div className='bg-yellow-600 w-screen flex justify-center items-center fixed inset-0 h-screen'>
        hello
    </div>
    // <Portal wrapperId='modal'>
    //     <div
    //     className='fixed inset-0 w-screen h-screen overflow-y-auto bg-gray-600 bg-opacity-80'
    //     aria-labelledby={ariaLabel?? "modal-title"}
    //     role='dialog'
    //     aria-modal="true"
    //     onClick={()=> navigate('/home')}
    //     >
    //         helo
    //     </div>
    //     <div className='fixed inset-0 pointer-events-none justify-center items-center max-h-screen overflow-scroll'>
    //         <div className={`${className} p-4 bg-gray-200 pointer-events-auto max-h-screen md:rounded-xl`}>
    //             {children}
    //         </div>
    //     </div>
    // </Portal>
  )
}

export default Modal;
