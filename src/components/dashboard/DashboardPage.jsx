import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import MenuItem from './MenuItem'
import { RiTeamFill } from 'react-icons/ri'
import { FaTasks } from 'react-icons/fa'
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
        <section className='w-full h-auto flex'>
            <div className='w-[250px] h-full min-h-screen bg-palette-beige '>
                <h1 className='bg-palette-lightgreen h-14 flex justify-center items-center font-righteous text-xl'>My Dashboard</h1>
                <ul className='mt-2'>
                    <MenuItem title='Board' path='/dashboard' active={activeMenuItem == 0 ? true : false} ><IoHome color='#191A19' size={20} /></MenuItem>
                    <MenuItem title='My Teams' path='/dashboard/teams' active={activeMenuItem == 1 ? true : false} ><RiTeamFill color='#191A19' size={20} /></MenuItem>
                    <MenuItem title='Tasks' path='/' active={false} ><FaTasks color='#191A19' size={20} /></MenuItem>
                </ul>
            </div>
            <main className='w-full h-auto min-h-screen'>
                {children}
            </main>
        </section>
    )
}

export default DashboardPage