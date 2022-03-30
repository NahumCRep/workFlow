import React, { useEffect } from 'react'

const Footer = () => {
  return (
    <div className='w-full h-[200px] bg-black flex flex-col gap-8 justify-center items-center'>
        <p className='w-auto font-righteous text-2xl text-palette-beige '><span className='text-palette-lightgreen'>Task</span>Flow</p>
        <p className='font-jost text-palette-beige text-sm'>Tzuzul Bootcamp 2022 &copy; Nahum Casco </p>
    </div>
  )
}

export default Footer