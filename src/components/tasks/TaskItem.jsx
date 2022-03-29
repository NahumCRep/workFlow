import React from 'react'
import { AiOutlineSelect } from 'react-icons/ai'
import { FaUsers } from 'react-icons/fa'


const TaskItem = ({ task, stateModalFunction, setCurrentTaskFunction }) => {
  const openTask = () => {
    setCurrentTaskFunction(task)
    stateModalFunction(true)
  }
 
  return (
    <div className='w-full h-32 bg-palette-dark text-palette-beige p-2 font-jost'>
      <div className='w-full h-full border-4 border-dotted border-palette-lightgreen p-2 '>
        <div className='flex items-center justify-between'>
          <h1 className=''>{task.name}</h1>
          <button onClick={() => openTask()}><AiOutlineSelect size={25} /></button>
        </div>
        <div className='mt-2 w-full h-[40%] '>
          <p className='text-sm truncate'>{task.description}</p>
        </div>
        <div className='flex gap-1 items-center mt-1 '>
          <FaUsers />
          <span className='text-sm'>{task.assigned.length}</span>
        </div>
      </div>
    </div>
  )
}

export default TaskItem