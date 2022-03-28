import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaTasks, FaUserAlt, FaTh } from 'react-icons/fa'
import { IoHome } from 'react-icons/io5'
import { HiUserGroup } from 'react-icons/hi'
import { BsGearFill } from 'react-icons/bs'
import MenuItem from '../dashboard/MenuItem'
import { get } from '../../api'



const TeamPage = ({ children }) => {
  const [activeMenuItem, setActiveMenuItem] = useState(null)
  const [team, setTeam] = useState()
  // const reduxTeam = useSelector(state => state.team) 
  const location = useLocation()
  const { id } = useParams()

  // useEffect(() => {
  //   if(location.pathname === `/dashboard/${id}/teams`) {
  //     setActiveMenuItem(2)
  //   }
  //   fetch(`http://localhost:4000/teams?id=${id}`)
  //           .then(res => res.json())
  //           .then(data => {
  //             console.log(data)
  //             setTeam(data)
  //           })
  //           .catch(error => console.log(error))

  // }, [location.pathname])

    useEffect(() => {
      get("/teams/"+id)
      .then(res=>{
          setTeam(res.data)
      })
      .catch(error=>console.log(error))
  }, [location.pathname])

  // useEffect(()=>{
  //   console.log('team page', reduxTeam)
  //   setTeam(reduxTeam)
    // fetch(`http://localhost:4000/teams?id=${id}`)
    // .then(res => res.json())
    // .then(data => {
    //   console.log(data)
    //   setTeam(data)
    // })
    // .catch(error => console.log(error))
  // },[reduxTeam])


  return (
    <section className='w-full h-screen flex overflow-hidden pt-16'>
      <div className='w-[20%] h-full min-h-screen bg-palette-beige shadow-xl  shadow-palette-dark '>
        <h1 className='bg-palette-lightgreen h-20 flex justify-center items-center font-righteous text-xl'>
          {
            // team && (team[0].name)
            team && team.name
            
          }
        </h1>
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
          <MenuItem title='Dashboard' path='/dashboard' active={activeMenuItem == 0 ? true : false} ><FaTh color='#191A19' size={20} /></MenuItem>
          <MenuItem title='Groups' path={`/dashboard/team/${id}`} active={activeMenuItem == 1 ? true : false} ><HiUserGroup color='#191A19' size={20} /></MenuItem>
          <MenuItem title='Members' path={`/dashboard/team/${id}/members`} active={activeMenuItem == 2 ? true : false} ><FaUserAlt color='#191A19' size={20} /></MenuItem>
          <MenuItem title='Tasks' path={`/dashboard/team/${id}/tasks`} active={activeMenuItem == 3 ? true : false} ><FaTasks color='#191A19' size={20} /></MenuItem>
          <MenuItem title='Settings' path='/' active={false} ><BsGearFill color='#191A19' size={20} /></MenuItem>
        </ul>
      </div>
      <main className='w-[85%] h-auto overflow-y-auto overflow-x-hidden'>
        {children}
      </main>
    </section>
  )
}

export default TeamPage