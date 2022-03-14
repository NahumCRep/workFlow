import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';
import { FaUserCircle } from 'react-icons/fa';
import { BsGearFill } from 'react-icons/bs';
import { MdLogin } from 'react-icons/md';

const Navbar = () => {
    const { logged, name } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const navigate = useNavigate();
    console.log(name);
    // const signOut = () => {
    //     fetch('https://backendtzuzulcode.wl.r.appspot.com/auth/logout',
    //         {
    //             method: "POST",
    //             credentials: 'include'
    //         }
    //     )
    //         .then(res => res.json())
    //         .then(data => {
    //             dispatch(logout())
    //         })
    // }

    const singOut = () => {
        dispatch(logout());
        setIsSettingsOpen(false);
        navigate('/');
    }

    return (
        <nav className="w-full h-16 bg-palette-dark flex justify-between items-center px-8">
            <div className='w-[33%]'>
                <Link to='/' className='w-auto' ><p className='w-auto font-righteous text-2xl text-palette-beige '><span className='text-palette-lightgreen'>Task</span>Flow</p></Link>
            </div>
            <ul className='text-palette-beige flex font-jost gap-9 w-[33%] justify-center'>
                <li><Link to="/">Home</Link></li>
                <li><Link to='/'>About</Link></li>
                <li><Link to="/">Services</Link></li>
                <li><Link to="/">Join</Link></li>
            </ul>
            <ul className='text-palette-beige flex gap-5 w-[33%] justify-end items-center'>
                {/* {logged ? <li onClick={signOut}>Cerrar sesión</li> : <li className='nav_loggin_btn'><Link to="/login">Iniciar sesión</Link></li>} */}
                <li><Link to='/dashboard'>Dashboard</Link></li>
                {
                    logged
                        ? (
                            <>
                                <li><Link to='/dashboard'>Dashboard</Link></li>
                                <li>
                                    <div >
                                        <span><FaUserCircle /> {name}</span>
                                        <button
                                            className='flex'
                                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                                        ><BsGearFill size={20} /></button>
                                    </div>
                                </li>
                            </>
                        )
                        : <li><Link to="/login" className='flex items-center transition-all duration-700 ease-in-out hover:gap-2 gap-1 bg-palette-lightgreen p-2  rounded-xl'>Login <MdLogin /></Link></li>
                }

            </ul>
            {/* <div>
                <button className='settins_logout' onClick={singOut}>Cerrar sesión</button>
            </div> */}
        </nav>
    )
}

export default Navbar