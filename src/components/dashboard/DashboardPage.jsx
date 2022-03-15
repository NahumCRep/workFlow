import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import MenuItem from './MenuItem'
import { RiTeamFill, RiLogoutBoxLine } from 'react-icons/ri'
import { FaTasks, FaUserCircle } from 'react-icons/fa'
import { MdOutlineTaskAlt } from 'react-icons/md'
import { IoHome } from 'react-icons/io5'

const DashboardPage = ({ children }) => {
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
        <section className='w-full h-auto min-h-screen flex'>
            <div className='w-[20%] h-full min-h-screen  bg-palette-beige sticky'>
                <h1 className='bg-palette-lightgreen h-20 flex justify-center items-center font-righteous text-xl'>My Dashboard</h1>
                <div className='flex gap-3 h-14 items-center px-6'>
                    <div className='w-[30px] h-[30px] bg-slate-600 rounded-full'></div>
                    <p className='font-righteous '>{'nahum casco'}</p>
                </div>
                <hr className='w-[80%] m-auto border-white' />
                <ul className='mt-2 h-full'>
                    <MenuItem title='Board' path='/dashboard' active={activeMenuItem == 0 ? true : false} ><IoHome color='#191A19' size={20} /></MenuItem>
                    <MenuItem title='My Teams' path='/dashboard/teams' active={activeMenuItem == 1 ? true : false} ><RiTeamFill color='#191A19' size={20} /></MenuItem>
                    <MenuItem title='Account' path='/dashboard/team' active={false} ><FaUserCircle color='#191A19' size={20} /></MenuItem>
                </ul>
                {/* <button className='bg-palette-lightgreen font-jost text-xl font-semibold flex justify-center items-center gap-1'>Logout <RiLogoutBoxLine color='#191A19' size={20} /></button> */}
            </div>
            <main className='w-[80%] h-auto min-h-screen'>
                {children}
            </main>
        </section>
    )
}

export default DashboardPage