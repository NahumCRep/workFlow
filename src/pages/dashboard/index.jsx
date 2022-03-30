import React, {useEffect, useState} from 'react'
import DashboardPage from '../../components/layouts/DashboardPage'
import DashboardTeamCard from '../../components/dashboard/DashboardTeamCard'
import Loader from '../../components/Loader'
import { get } from '../../api'

const Dashboard = () => {
  const [allTeams , setAllTeams] = useState([])
  const [allLists, setAllLists] = useState(0)

  useEffect(()=>{
    get('/teams/')
    .then(res => {
      console.log('dash', res.data)
        setAllTeams(res.data)
        let listQuantity = 0
        res.data.forEach((team)=>{
          listQuantity += team.lists.length
        })
        setAllLists(listQuantity)
     })
    .catch(error=>console.log(error))
  },[])

  return (
    <DashboardPage>
      <div className='w-full  relative bg-black flex px-4'>
        <p className='font-righteous text-9xl text-palette-beige'>T</p>
        <p className='font-righteous text-9xl text-palette-lightgreen'>F</p>
      </div>
      <div className=' w-full h-[150px]  grid grid-cols-2 gap-4 mt-10'>
          <div className='flex flex-col p-3 gap-6  bg-palette-beige shadow-lg shadow-gray-500'>
            <h2 className='font-righteous text-3xl '>All Work Teams</h2>
            <p className='w-full text-center font-righteous text-5xl'>{allTeams.length}</p>
          </div>
          <div className='flex flex-col p-3 gap-6  bg-palette-beige shadow-lg shadow-gray-500'>
            <h2 className='font-righteous text-3xl' >All Work Lists</h2>
            <p className='w-full text-center font-righteous text-5xl'>{allLists}</p>
          </div>
      </div>
      <div className='w-full h-auto mt-20 mb-5 grid grid-cols-4 gap-2'>
        {
          allTeams 
          ? (
                allTeams.map((team)=>{
                  return(
                    <DashboardTeamCard key={team._id} teamData={team} />
                  )
                })
          ) : <Loader />
        }
      </div>
    </DashboardPage>
  )
}

export default Dashboard