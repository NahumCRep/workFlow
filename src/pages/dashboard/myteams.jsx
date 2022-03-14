import React, { useState } from 'react'
import DashboardPage from '../../components/dashboard/DashboardPage'
import create from '../../assets/images/teamup.svg'
import { FaTimes } from 'react-icons/fa'


const MyTeams = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const teams = ''

    const addTeam = (event) =>{
        event.preventDefault()
        alert("Creando...")
    }

    return (
        <DashboardPage>
            <section className='w-full h-auto'>
                <div className='h-20 w-full p-2'>
                    <div className='w-full h-full bg-palette-beige rounded-2xl py-2 px-5 flex justify-between items-center'>
                        <h1 className='text-palette-dark font-righteous text-xl '>My Teams</h1>
                        <button  onClick={() => setIsModalOpen(true)} className='font-righteous w-24 h-full transition-all duration-700 ease-in-out hover:w-28 bg-palette-dark text-palette-beige rounded-2xl float-right'>
                            Create
                        </button>
                    </div>
                </div>
                <div className='w-full h-full'>
                    {
                        teams !== ''
                            ? <h1>si hay</h1>
                            : (
                                <div className='w-full h-full flex flex-col items-center pt-11'>
                                    <img src={create} className='w-1/2 h-1/2' alt='create image' />
                                    <button  onClick={() => setIsModalOpen(true)} className='w-56 h-12 bg-palette-lightgreen font-jost text-2xl font-semibold text-palette-dark transition-shadow duration-700 ease-in-out hover:shadow-lg hover:shadow-palette-green'>
                                        Create a Team
                                    </button>
                                </div>
                            )
                    }
                </div>
            </section>
            {
                isModalOpen && (
                    <div className='absolute left-0 top-0 h-full min-h-screen w-screen max-w-full bg-black bg-opacity-50 flex justify-center items-center'>
                        <div className={`bg-white h-1/2 w-1/2 relative ${isModalOpen && 'animate-fadein'}`}>
                            <button className='absolute right-2 top-2' onClick={() => setIsModalOpen(false)}><FaTimes className='w-8 h-8' /></button>
                            <form onSubmit={addTeam}>
                                <input type="text" />
                                <input type="text" />
                                <input type="text" />
                                <button>Crear equipo</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </DashboardPage>
    )
}

export default MyTeams