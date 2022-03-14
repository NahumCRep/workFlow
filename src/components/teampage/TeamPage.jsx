import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { RiTeamFill } from 'react-icons/ri'
import { FaTasks, FaUserAlt } from 'react-icons/fa'
import { MdOutlineTaskAlt } from 'react-icons/md'
import { IoHome } from 'react-icons/io5'
import { HiUserGroup } from 'react-icons/hi'
import { BsGearFill } from 'react-icons/bs'
import MenuItem from '../dashboard/MenuItem'

const TeamPage = ({ name, children }) => {
  const [activeMenuItem, setActiveMenuItem] = useState(null)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname == '/dashboard') {
      setActiveMenuItem(0)
    } else if (location.pathname == '/dashboard/teams') {
      setActiveMenuItem(1)
    }
  }, [location.pathname])

  return (
    <section className='w-full h-auto flex'>
      <div className='w-[20%] h-full min-h-screen bg-palette-beige '>
        <h1 className='bg-palette-lightgreen h-20 flex justify-center items-center font-righteous text-xl'>{name}</h1>
        <ul className='px-7 py-5 flex flex-col gap-2'>
          <li className='flex justify-between items-center'>
            <h2 className='font-jost font-semibold text-lg'>Role </h2>
            <h4 className='text-center w-20 font-jost font-medium'>{'Lider'}</h4>
          </li>
          <li className='flex justify-between items-center'>
            <h2 className='font-jost font-semibold text-lg'>Tasks </h2>
            <h4 className='text-center w-20 font-jost font-medium'>{'2'}</h4>
          </li>
        </ul>
        <hr className='w-[80%] m-auto border-white' />
        <ul className='mt-2'>
          <MenuItem title='Dashboard' path='/dashboard' active={activeMenuItem == 0 ? true : false} ><IoHome color='#191A19' size={20} /></MenuItem>
          <MenuItem title='Groups' path='/dashboard' active={activeMenuItem == 0 ? true : false} ><HiUserGroup color='#191A19' size={20} /></MenuItem>
          <MenuItem title='Members' path='/dashboard/team/members' active={activeMenuItem == 1 ? true : false} ><FaUserAlt color='#191A19' size={20} /></MenuItem>
          <MenuItem title='Tasks' path='/' active={false} ><FaTasks color='#191A19' size={20} /></MenuItem>
          <MenuItem title='Settings' path='/' active={false} ><BsGearFill color='#191A19' size={20} /></MenuItem>
        </ul>
      </div>
      <main className='w-[85%] h-auto min-h-screen'>
        {children}
      </main>
    </section>
  )
}

export default TeamPage