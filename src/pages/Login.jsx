import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, validate } from '../features/user/userSlice'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import '../css/login.css'
import welcome from '../assets/images/login.svg'
import { URL } from '../config'

export default function Login() {
    const [isNotLoginError, setIsNoLoginError] = useState(true);
    // ¿Quiero consultar el estado global?
    const user = useSelector((state) => state.user)

    // ¿Quiero actualizar el estado global?
    const dispatch = useDispatch()

    //Navegación
    const navigate = useNavigate()

    useEffect(() => {
        if (user.logged) {
            navigate('/')
        }
    }, [user])

    const iniciarSesion = (e) => {
        e.preventDefault()
        const { email: { value: email }, password: { value: password } } = e.target
        dispatch(login({ email, password }));
    }

    return (
        <section className="bg-palette-beige h-auto min-h-screen py-12 md:py-0 flex flex-col justify-center items-center md:flex-row">
            <div className=' w-[80%] h-1/2 md:w-[40%] md:h-4/5'>
                <img src={welcome} alt='welcome image' className='w-full h-full' />
            </div>
            <div className="w-[90%] h-1/2 md:w-[40%] md:h-4/5  flex flex-col pt-7 ">
                {/* <p className='p_title'>Usuario: {user.logged ? "Bienvenido " + user.name : "Inicia sesión"}</p> */}
                <form onSubmit={iniciarSesion} className='w-full p-4 bg-palette-lightgreen rounded-xl font-jost'>
                    <h1 className='font-righteous text-4xl text-palette-dark'>Login</h1>
                    <div className='flex flex-col w-full mt-4'>
                        <label className='text-palette-dark font-semibold' htmlFor="email">Email</label>
                        <input className='bg-palette-beige h-9 p-3 rounded-3xl mt-2 outline-none border-none text-center' type="email" name="email" placeholder=" " autoComplete="off" />
                    </div>
                    <div className='flex flex-col w-full mt-3'>
                        <label className='text-palette-dark font-semibold' htmlFor="password">Password</label>
                        <input className='bg-palette-beige h-9 p-3 rounded-3xl mt-2 outline-none border-none text-center' type="password" name="password" placeholder=" " autoComplete="off" />
                    </div>
                    <button className='w-full h-9 bg-palette-green text-palette-beige mt-6 rounded-xl transition-all duration-700 ease-in-out hover:tracking-widest'>
                        Sign in
                    </button>
                </form>
                <div className='w-full flex justify-center items-center md:hidden'>
                    {user.loading && <p>Loading...</p>}
                    {
                        user.error && <p className='p_error'>{user.message}</p>
                    }
                </div>
                <div className='w-full flex flex-col items-center mt-2 font-jost'>
                    <p>...or sign in with</p>
                    <a href={`${URL}/auth/google`} className='w-full h-12 bg-white mt-4 rounded-xl justify-center items-center'>
                        <p className='flex gap-2 w-full h-full justify-center items-center  transition-all duration-700 ease-in-out hover:tracking-widest'>
                            <FcGoogle /> Google
                        </p>
                    </a>
                    <p className='w-full mt-3'>
                        Dont have an account ? 
                        <u><Link to='/signup' className='font-bold text-palette-green ml-3' >Create one</Link></u>
                    </p>
                </div>
            </div>
        </section>
    )
}