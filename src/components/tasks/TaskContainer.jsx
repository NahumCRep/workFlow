import React from 'react'

const TaskContainer = ({ title, children }) => {
    return (
        <div className='w-full h-[300px] '>
            <div className='w-full h-10 bg-palette-dark flex items-center px-2'>
                <h1 className='text-palette-beige '>{title}</h1>
            </div>
            <div className='w-full h-full bg-palette-beige gap-5 p-2'>
                {children}
            </div>
        </div>
    )
}

export default TaskContainer