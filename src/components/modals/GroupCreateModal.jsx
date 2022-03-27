import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { post } from '../../api'


const GroupCreateModal = ({ teamID, modalState, setModalOpen, refreshData}) => {
    const [modalData, setModalData] = useState({
        name: "",
        description: ""
    })

    const addGroup = (e) => {
        e.preventDefault()
        post(`/teams/${teamID}/addList`,modalData)
        .then(res => {
            setModalOpen(false)
            refreshData()
        })
        .catch(error => console.error(error))
    }

    const handleChange = (e) => {
        setModalData({
            ...modalData,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div>
            <div className='absolute left-0 top-0 h-screen w-screen max-w-full bg-black bg-opacity-30' onClick={() => { setModalOpen(false) }}></div>
            <div className='h-[300px] w-[80%] md:w-96 absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-l'>
                <div className={`bg-white h-full w-full relative ${modalState && 'animate-fadein'} shadow-md shadow-palette-green`}>
                    <button className='absolute right-3 top-3' onClick={() => setModalOpen(false)}><FaTimes color='#191A19' className='w-8 h-8' /></button>
                    <div className='flex items-center px-2'>
                        <h1 className='font-righteous text-xl text-palette-dark mt-4 border-b-4 border-palette-lightgreen'>Create Group</h1>
                    </div>
                    <form onSubmit={addGroup} className='flex flex-col gap-1 px-3 font-jost'>
                        <label htmlFor='name' className='mt-2 font-semibold'>Name</label>
                        <input name="name" type="text" onChange={handleChange} className='w-full h-10 bg-palette-gray px-2 rounded-md outline-none border-2 focus:border-palette-lightgreen' />
                        <label htmlFor='description' className='mt-2 font-semibold'>Description</label>
                        <input name="description" type="text" onChange={handleChange} className='w-full h-10 bg-palette-gray px-2 rounded-md outline-none border-2 focus:border-palette-lightgreen' />
                        <button className='w-full h-12 mt-4 rounded-md bg-palette-lightgreen text-white transition-all duration-700 ease-in-out hover:tracking-widest'>Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GroupCreateModal