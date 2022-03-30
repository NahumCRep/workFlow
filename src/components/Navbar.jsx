import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';
import { FaUserCircle } from 'react-icons/fa';
// import { BsGearFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi'
import { MdLogin } from 'react-icons/md';

const Navbar = () => {
    const { logged, name } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const navigate = useNavigate();

    const singOut = () => {
        dispatch(logout());
        setIsSettingsOpen(false);
        navigate('/');
    }

    return (
        <nav className="w-full h-16 bg-palette-dark fixed z-50 flex justify-between items-center px-8">
            <div className='w-[33%]'>
                <div className='w-fit'>
                    <Link to='/' className='w-auto' ><p className='w-auto font-righteous text-2xl text-palette-beige '><span className='text-palette-lightgreen'>Task</span>Flow</p></Link>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <ul className='text-palette-beige flex gap-5 justify-end items-center'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to='/'>About</Link></li>
                    <li><Link to="/">Services</Link></li>
                    <li><Link to="/">Join</Link></li>
                    {
                        logged
                            ? (
                                <>
                                    <li><Link to='/dashboard'>Dashboard</Link></li>
                                    <li>
                                        <button
                                            className='flex'
                                            onClick={() => singOut()}
                                        ><BiLogOut size={20} /></button>
                                    </li>
                                </>
                            )
                            : (
                                <>
                                    <li><Link to="/signup">SignUp</Link></li>
                                    <li><Link to="/login" className='flex items-center transition-all duration-700 ease-in-out hover:bg-palette-green gap-1 bg-palette-lightgreen p-2  rounded-xl'>Login <MdLogin /></Link></li>
                                </>
                            )
                    }
                </ul>
            </div>

        </nav>
    )
}

export default Navbar