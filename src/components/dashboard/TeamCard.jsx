import React from 'react'
import { Link } from 'react-router-dom'

const TeamCard = ({team}) => {
  return (
    <Link to={`/dashboard/team/${team.id}`}>
        <div className='bg-palette-beige'>

        </div>
    </Link>
  )
}

export default TeamCard