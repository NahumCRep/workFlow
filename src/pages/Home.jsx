import React from 'react'
import { useRef } from 'react'
import workflowImage from '../assets/images/workflow.svg'

const Home = () => {
  const aboutRef = useRef(null)
  return (
    <section>
      <header className='flex h-screen'>
        <div className='w-1/2 bg-palette-lightgreen rounded-br-full flex justify-center items-center flex-col'>
          <div className='w-[60%] flex flex-col'>
            <h1 className='font-righteous text-6xl'>Do tasks in an easy way</h1>
            <p className='font-righteous'>with</p>
            <p className='text-4xl font-righteous'><span className='text-palette-beige'>Task</span>Flow</p>
          </div>
        </div>
        <div className='w-1/2 flex justify-center items-center'>
          <img src={workflowImage} alt='workFlow image' />
        </div>
      </header>
    </section>
  )
}

export default Home