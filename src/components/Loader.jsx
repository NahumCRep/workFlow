import React from 'react'
import { BiLoader } from 'react-icons/bi'

const Loader = () => {
  return (
    <div className='w-full h-full flex justify-center items-center animate-spin'>
        <BiLoader color='#1E5128' />
    </div>
  )
}

export default Loader