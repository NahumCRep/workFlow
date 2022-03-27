import React from 'react'
import { FaEdit, FaTimes } from 'react-icons/fa'

const MemberCard = () => {
  return (
    <div className='w-full h-12 mt-1 bg-palette-beige  divide-x grid grid-cols-4 font-jost text-base '>
        <div className='flex items-center justify-center gap-3 h-full'>
            <div className='w-8 h-8 bg-palette-green rounded-full' title="nahum casco"></div>
            <p>nahum casco</p>
        </div>
        <div className='flex items-center justify-center gap-3'>
            <p>nahumcasco@gmail.com</p>
        </div>
        <div className='flex items-center justify-center gap-2'>
            <p>Role</p>
            <p>Validator</p>
        </div>
        <div className='flex items-center justify-center gap-3'>
            <button className='w-32 h-8 bg-palette-dark rounded-md text-palette-beige flex items-center justify-center gap-2'><FaEdit />Edit Role</button>
            <button className='w-10 h-8 bg-red-700 rounded-md flex justify-center items-center'><FaTimes /></button>
        </div>
    </div>
  )
}

export default MemberCard