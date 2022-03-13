import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MenuItem = ({title, path, children, active}) => {
  return (
    <li className={`p-1`}>
        <Link to={path} className={`${active && 'bg-white'} w-full h-10 rounded-xl flex items-center gap-2 px-7 font-jost font-semibold`}>
            {children}
            {title}
        </Link>
    </li>
  )
}

export default MenuItem