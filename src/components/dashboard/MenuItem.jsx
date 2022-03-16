import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MenuItem = ({title, path, children, active}) => {
  return (
    <li className='pr-1'>
        <Link to={path} className={`${active && 'bg-palette-lightgreen'} w-full h-10 flex items-center gap-2 px-3 font-jost font-semibold transition-colors duration-700 ease-in-out hover:bg-white`}>
            {children}
            {title}
        </Link>
    </li>
  )
}

export default MenuItem