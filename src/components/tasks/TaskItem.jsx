import React from 'react'

const TaskItem = ({task}) => {
  return (
    <div className='w-full h-7 bg-red-400'>
        <h1>{task.task}</h1>
    </div>
  )
}

export default TaskItem