import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';
import { FaUserCircle } from 'react-icons/fa';
import { BsGearFill } from 'react-icons/bs';
import {MdLogin} from 'react-icons/md';

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
        <nav className="w-full h-20 bg-palette-dark ">
            <ul className='text-palette-beige  flex'>
                <li><Link to="/">Inicio</Link></li>
                {/* {logged ? <li onClick={signOut}>Cerrar sesión</li> : <li className='nav_loggin_btn'><Link to="/login">Iniciar sesión</Link></li>} */}
                {
                    logged
                        ? (
                            <li>
                                <div >
                                    <span><FaUserCircle /> {name}</span>
                                    <button 
                                        className='flex'
                                        onClick={()=>setIsSettingsOpen(!isSettingsOpen)}
                                    ><BsGearFill size={20} /></button>
                                </div>
                            </li>
                        )
                        : <li><Link to="/login">Login <MdLogin /></Link></li>
                }
                <li><Link to='/dashboard'>Dashboard</Link></li>
            </ul>
            <div>
                <button className='settins_logout' onClick={singOut}>Cerrar sesión</button>
            </div>
        </nav>
    )
}

export default Navbar