import React, { useState, useRef, useEffect } from 'react'
import { FaTimes, FaPlus } from 'react-icons/fa'
import { CgGoogleTasks } from 'react-icons/cg'
import { useSelector } from 'react-redux'
import { put, del, post, postComment } from '../../api'


const TaskModal = ({ taskModalState, setModalOpen, currentTask, list, refreshTaskPageData, currentTeam }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [isCommenting, setIsCommenting] = useState(false)
    const [assignedMembers, setAssignedMembers] = useState([])
    const [commentsList, setCommentsList] = useState([])
    const role = useSelector(state => state.team)
    const descriptionRef = useRef(null)
    const commentRef = useRef(null)
    const fileRef = useRef(null)

    useEffect(() => {
        // console.log(currentTeam.members)
        // console.log(currentTask.assigned)
        let taskMembers = []
        currentTask.assigned.forEach((person) => {
            currentTeam.members.forEach((memb)=>{
                if(memb._id._id == person){
                    taskMembers.push(memb)
                }
            })
        })
        console.log('miembros', taskMembers)
        setCommentsList(currentTask.comments[0].content)
        setAssignedMembers(taskMembers)
        // console.log(currentTask.comments)
    }, [])


    const editTask = () => {
        put(`/tasks/${currentTask._id}`, { description: descriptionRef.current.value })
            .then(res => {
                refreshTaskPageData(list._id)
            })
            .catch(error => console.log(error))
    }

    const deleteTask = () => {
        del(`/lists/${list._id}/removeTask/${currentTask._id}`)
            .then(res => {
                refreshTaskPageData(list._id)
                setModalOpen(false)
            })
            .catch(error => console.log(error))
    }

    const addComment = (e) => {
        e.preventDefault()
        console.log(fileRef.current.files[0])

        const {content, file} = e.target
        
        let commentData = new FormData()
        commentData.append('content', content.value)
        commentData.append('file', file.files[0])
        post(`/tasks/${currentTask._id}/addComment`, commentData)
            .then(res => console.log(res))
            .catch(error => console.log(error))
    }

    return (
        <div>
            <div className='absolute left-0 top-0 h-screen w-screen max-w-full text-palette-dark bg-black bg-opacity-30' onClick={() => { setModalOpen(false) }}></div>
            <div className='h-auto w-[80%] md:w-[60%] absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-l'>
                <div className={`bg-white h-full w-full px-4 py-3 relative ${taskModalState && 'animate-fadein'} shadow-md shadow-palette-green`}>
                    <button className='absolute right-4 top-4' onClick={() => setModalOpen(false)}><FaTimes color='#191A19' className='w-8 h-8' /></button>
                    <div className='text-palette-dark flex items-center gap-1'>
                        <h1 className='w-auto font-righteous text-2xl font-semibold mt-2'>Task</h1>
                        <CgGoogleTasks size={30} color='#4E9F3D' />
                    </div>
                    <div className='w-full flex gap-2'>
                        <div className='w-[65%] flex flex-col gap-2 font-jost mt-3 '>
                            <p><span className='font-semibold'>Title</span> {currentTask.name}</p>
                            <label htmlFor='description' className='font-semibold'>Task Description</label>
                            {
                                isEditing
                                    ? (
                                        <div>
                                            <input ref={descriptionRef} name="description" type="text" defaultValue={currentTask.description} className='w-full h-10 bg-palette-gray px-2 rounded-md outline-none border-2 focus:border-palette-lightgreen' />
                                            <button onClick={() => editTask()} className='float-right py-1 px-2 mt-1 bg-palette-lightgreen'>accept</button>
                                        </div>
                                    ) : <p className='border-2 border-dashed border-palette-lightgreen p-2 h-16 max-h-24'>{currentTask.description}</p>
                            }
                            <div className='w-full h-64'>
                                <div className='flex items-center justify-between gap-2 mt-3'>
                                    <h2 className='font-medium'>Comments</h2>
                                    <button onClick={() => setIsCommenting(!isCommenting)} className='bg-palette-gray h-7 w-7 flex justify-center items-center'><FaPlus size={15} /></button>
                                </div>
                                <div className='w-full h-[200px] mt-3 overflow-y-auto'>
                                    {isCommenting && (
                                        <form onSubmit={addComment} className='bg-palette-gray'>
                                            <input ref={commentRef} name="content" type="text" className='w-full h-10 bg-white px-2 outline-none border-2 focus:border-palette-lightgreen' />
                                            <div className='flex p-1 justify-between items-center'>
                                                <input ref={fileRef} name="file" type='file' className='w-1/2 bg-palette-gray outline-none' />
                                                <button type='submit' className='py-1 px-2 bg-palette-lightgreen'>accept</button>
                                            </div>
                                        </form>
                                    )}
                                    {
                                        console.log('comentarios', commentsList)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='w-[30%] h-auto'>
                            {
                                role == 'lider' || role == 'editor' ? (
                                    <div className='w-full h-auto p-2 bg-palette-beige'>
                                        <h3 className='text-center bg-palette-dark p-1 text-palette-beige font-jost'>Lider Options</h3>
                                        <div className='flex'>
                                            <button onClick={() => setIsEditing(!isEditing)} className='flex-grow h-10 font-jost bg-white transition-colors duration-700 ease-in-out hover:bg-palette-lightgreen'>
                                                {isEditing ? "Stop" : "Edit"}
                                            </button>
                                            <button onClick={() => deleteTask()} className='flex-grow h-10 font-jost bg-white transition-colors duration-700 ease-in-out hover:bg-red-500'>Delete</button>
                                        </div>
                                    </div>
                                ) : null
                            }
                            <div className='w-full h-auto p-2 bg-palette-beige'>
                                <h3 className='text-center bg-palette-dark p-1 text-palette-beige font-jost'>Assigned</h3>
                                {
                                    assignedMembers.map((assignedMemb)=>{
                                        return(
                                            <h4 className='text-sm'>{assignedMemb._id.name}</h4>
                                        )
                                    })
                                }
                            </div>
                            {
                               role == 'lider' || role == 'validador' ? (
                                    <div className='w-full h-auto p-2 bg-palette-beige flex flex-col gap-2'>
                                        <h3 className='text-center bg-palette-dark p-1 text-palette-beige font-jost'>Validate Task</h3>
                                        <button className='p-1 bg-palette-lightgreen'>Complete Task</button>
                                        <button className='p-1 bg-red-600'>Reject Task</button>
                                    </div>
                                ) : null
                            }
                            {/* <button className='w-full h-12 mt-1 rounded-md bg-palette-lightgreen text-white transition-all duration-700 ease-in-out hover:tracking-widest'>Accept</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskModal