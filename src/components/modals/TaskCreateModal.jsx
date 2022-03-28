import React, { useState, useEffect } from 'react'
import { FaTimes, FaPlus } from 'react-icons/fa'
import { post } from '../../api'

const TaskCreateModal = ({ taskModalState, setModalOpen, team, currentList }) => {
    const [memberList, setMemberList] = useState(team.members)
    const [assignedMembers, setAssignedMemebers] = useState([])
    const [taskData, setTaskData] = useState({
        name: "",
        description: "",
        assigned: []
    })

    const assignMember = (e) => {
        let newAssigned = taskData.assigned
        newAssigned.push(e.target.value)
        setTaskData({
            ...taskData,
            assigned: newAssigned
        })
        // console.log(e.target.value)
        // const memberIndex = memberList.indexOf(memberItem)
        // const removed = memberList.splice(memberIndex, 1)
        // setAssignedMemebers([...assignedMembers, removed])
        // console.log(removed)
    }

    const handleChange = (e) => {
        setTaskData({
            ...taskData,
            [e.target.name]: e.target.value
        })
    }

    const addTask = (e) => {
        e.preventDefault()
        // console.log('current list',currentList._id)
        // console.log(taskData)
        post(`/lists/${currentList._id}/addTask`, taskData)
            .then(res => {
                console.log('task added')
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <div className='absolute left-0 top-0 h-screen w-screen max-w-full text-palette-dark bg-black bg-opacity-30' onClick={() => { setModalOpen(false) }}></div>
            <div className='h-auto w-[80%] md:w-[40%] absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-l'>
                <div className={`bg-white h-full w-full px-2 py-3 relative ${taskModalState && 'animate-fadein'} shadow-md shadow-palette-green`}>
                    <button className='absolute right-3 top-3' onClick={() => setModalOpen(false)}><FaTimes color='#191A19' className='w-8 h-8' /></button>
                    <div className='text-palette-dark'>
                        <h1 className='font-jost text-xl font-semibold mt-2 border-b-4 border-palette-lightgreen'>Create Task</h1>
                    </div>
                    <form className='flex flex-col gap-2 font-jost mt-6 '>
                        <label htmlFor='name' className='font-semibold'>Title</label>
                        <input onChange={handleChange} name="name" type="text" className='w-full h-10 bg-palette-gray px-2 rounded-md outline-none border-2 focus:border-palette-lightgreen' />
                        <label htmlFor='description' className='font-semibold'>Task Description</label>
                        <input onChange={handleChange} name="description" type="text" className='w-full h-10 bg-palette-gray px-2 rounded-md outline-none border-2 focus:border-palette-lightgreen' />
                    </form>
                    <div className='w-full flex h-64 bg-slate-400'>
                        <div className='w-[40%] h-full bg-palette-beige px-2 py-4'>
                            <h1 className='w-full flex items-center justify-start font-semibold px-2 mb-2'>Members List</h1>
                            <div className='h-full overflow-x-hidden overflow-y-auto'>
                                {memberList.map((member) => {
                                    return (
                                        <button key={member._id._id} onClick={assignMember} value={member._id._id} className='w-full h-10 outline-none px-2 hover:bg-white text-left'>{member._id.name}</button>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='w-[60%] h-full bg-white px-2 py-4'>
                            <h1 className='w-full flex items-center justify-start font-semibold px-2 mb-2'>Assigned Members</h1>
                            <div className='h-full overflow-x-hidden overflow-y-auto'>
                                {assignedMembers.map((member) => {
                                    return (
                                        <div key={member._id._id} className='w-full h-10 px-2 bg-palette-gray flex items-center justify-between'>
                                            {member._id.name}
                                            <button className='outline-none border-none'><FaTimes /></button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <button onClick={addTask} className='w-full h-12 mt-1 rounded-md bg-palette-lightgreen text-white transition-all duration-700 ease-in-out hover:tracking-widest'>Accept</button>
                </div>
            </div>
        </div>
    )
}

export default TaskCreateModal  