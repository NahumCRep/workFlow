import React, { useEffect, useState } from 'react'
import { get } from '../../api'

const DashboardTeamCard = ({ teamData }) => {
    const [tasks, setTasks] = useState(0)

    useEffect(() => {
        get("/teams/" + teamData._id)
            .then(res => {
                console.log('team', res.data.lists)
                if (res.data.lists.length > 0) {
                    let taskQuantity = 0
                    res.data.lists.forEach((list) => {
                        taskQuantity += list.tasks.length
                    })
                    setTasks(taskQuantity)
                } else {
                    setTasks(0)
                }
                //   setCurrentTeam(res.data.lists)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className='h-40 flex flex-col gap-1 bg-palette-dark p-3 font-jost overflow-x-hidden'>
            <div>
                <div className=' w-full h-8'>
                    <img src={teamData.img} alt="team cover" className='w-full h-full object-cover' />
                </div>
                <h1 className='text-lg font-medium text-palette-beige'>{teamData.name}</h1>
            </div>
            <p className='w-full truncate text-palette-lightgreen text-sm h-auto border-2 border-dotted border-palette-lightgreen px-1'>
                {teamData.description}
            </p>
            <div className='text-sm flex gap-1 items-center text-palette-beige'>
                <p>leader:</p>
                <p>{teamData.idLeader.name}</p>
            </div>
            <div className='flex gap-8'>
                <div className='text-sm flex gap-1 items-center text-palette-beige'>
                    <p>lists:</p>
                    <p>{teamData.lists.length}</p>
                </div>
                <div className='text-sm flex gap-1 items-center text-palette-beige'>
                    <p>Tasks:</p>
                    <p>{tasks ? tasks : '0'}</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardTeamCard