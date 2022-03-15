import React, { useState, useEffect } from 'react'
import DashboardPage from '../../components/dashboard/DashboardPage'
import create from '../../assets/images/teamup.svg'
import { FaTimes } from 'react-icons/fa'
import Loader from '../../components/Loader'


const MyTeams = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [allTeams, setAllTeams] = useState(null)
    const teams = ''

    const addTeam = (event) => {
        event.preventDefault()
        alert("Creando...")
    }

    const getTeams = () => {
        fetch(' http://localhost:4000/teams')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAllTeams(data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getTeams()
    }, [])

    return (
        <DashboardPage>
            <section className='w-full h-auto'>
                <div className='h-20 w-full p-2'>
                    <div className='w-full h-full bg-palette-beige rounded-2xl py-2 px-5 flex justify-between items-center'>
                        <h1 className='text-palette-dark font-righteous text-xl '>My Teams</h1>
                        <button onClick={() => setIsModalOpen(true)} className='font-righteous w-24 h-full transition-all duration-700 ease-in-out hover:w-28 bg-palette-dark text-palette-beige rounded-2xl float-right'>
                            Create
                        </button>
                    </div>
                </div>
                <div className='w-full h-full'>
                    {
                        allTeams
                            ? (
                                allTeams !== ''
                                    ? (
                                        allTeams.map(team => {
                                            return (
                                                <h1 key={team.id}>{team.name}</h1>
                                            )
                                        })
                                    )
                                    : (
                                        <div className='w-full h-full flex flex-col items-center pt-11'>
                                            <img src={create} className='w-1/2 h-1/2' alt='create image' />
                                            <button onClick={() => setIsModalOpen(true)} className='w-56 h-12 bg-palette-lightgreen font-jost text-2xl font-semibold text-palette-dark transition-shadow duration-700 ease-in-out hover:shadow-lg hover:shadow-palette-green'>
                                                Create a Team
                                            </button>
                                        </div>
                                    )
                            )
                            : <Loader />
                    }
                </div>
            </section>
            {
                isModalOpen && (
                    <div className='absolute left-0 top-0 h-full w-screen max-w-full bg-black bg-opacity-50 flex justify-center items-center'>
                        <div className={`bg-white h-[450px] w-96 relative ${isModalOpen && 'animate-fadein'} shadow-xl shadow-palette-green`}>
                            <button className='absolute right-3 top-3' onClick={() => setIsModalOpen(false)}><FaTimes color='#191A19' className='w-8 h-8' /></button>
                            <div className='flex items-center px-2'>
                                <img src={create} className='w-32 h-32' alt="create team" />
                                <h1 className='font-righteous text-xl text-palette-dark ml-2'>Create Team</h1>
                            </div>
                            <form onSubmit={addTeam} className='flex flex-col gap-1 px-3 font-jost'>
                                <label htmlFor='name' className='mt-2 font-semibold'>Name</label>
                                <input name="name" type="text" className='w-full h-10 bg-palette-gray px-2 rounded-md' />
                                <label htmlFor='image' className='mt-2 font-semibold'>Image</label>
                                <input name="image" type="text" className='w-full h-10 bg-palette-gray px-2 rounded-md' />
                                <label htmlFor='description' className='mt-2 font-semibold'>Description</label>
                                <input name="description" type="text" className='w-full h-10 bg-palette-gray px-2 rounded-md' />
                                <button className='w-full h-12 mt-4 rounded-md bg-palette-lightgreen text-white transition-all duration-700 ease-in-out hover:tracking-widest'>Create</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </DashboardPage>
    )
}

export default MyTeams