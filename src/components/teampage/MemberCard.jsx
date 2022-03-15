import React from 'react'
import { FaEdit, FaTimes } from 'react-icons/fa'

const MemberCard = () => {
  return (
    <div className='w-full h-16 bg-palette-beige border-black divide-x grid grid-cols-4 font-jost text-lg '>
        <div className='flex items-center justify-center gap-3 h-full'>
            <div className='w-12 h-12 bg-palette-green rounded-full'></div>
            <p>nahum casco</p>
        </div>
        <div className='flex items-center justify-center gap-3'>
            <p>nahumcasco@gmail.com</p>
        </div>
        <div className='flex items-center justify-center gap-3'>
            <p>Role</p>
            <p>Validator</p>
        </div>
        <div className='flex items-center justify-center gap-3'>
            <button className='w-32 h-10 bg-palette-lightgreen flex items-center justify-center gap-2'><FaEdit />Edit Role</button>
            <button className='w-10 h-10 bg-red-700 flex justify-center items-center'><FaTimes /></button>
        </div>
    </div>
  )
}

export default MemberCard