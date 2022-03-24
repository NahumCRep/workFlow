import React from 'react'
import { Link } from 'react-router-dom'

const TeamCard = ({ team }) => {
  return (
    <article className='group border-2'>
      <Link to={`/dashboard/team/${team._id}`}>
        <div className='bg-palette-dark h-[230px] p-1'>
          <figure className='overflow-hidden w-full h-[70%]'>
            <img src={team.img} className="w-full h-full  object-cover transition-all duration-700 ease-in-out scale-100 group-hover:scale-125  " alt="cover" />
          </figure>
          <div className='p-3'>
            <h1 className='text-palette-beige font-jost text-xl'>{team.name}</h1>
            <h2 className='text-palette-beige font-jost'>{team.description}</h2>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default TeamCard