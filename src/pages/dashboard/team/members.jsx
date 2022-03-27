import React, { useState } from 'react'
import TeamPage from '../../../components/layouts/TeamPage'
import MemberCard from '../../../components/teampage/MemberCard'
import { FaTimes } from 'react-icons/fa'
import memberImage from '../../../assets/images/member.svg'

const Members = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const addMember = () => {

  }

  const handleChange = () => {

  }


  return (
    <TeamPage>
        <section className='w-full h-auto p-4 mt-3'>
            <div className='h-12 '>
                <div className='w-full h-full pb-6 border-b-2 border-palette-green flex justify-between items-center font-jost text-lg font-bold '>
                    <h1>Members</h1>
                    <button onClick={() => setIsModalOpen(true)} className='bg-palette-lightgreen px-9 h-10 font-medium rounded-md '>Invite Member</button>
                </div>
            </div>
            <div className='w-full h-full mt-4'>
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />

            </div>
        </section>
        {
                isModalOpen && (
                    <div>
                        <div className='absolute left-0 top-0 h-screen w-screen max-w-full bg-black bg-opacity-30' onClick={() => { setIsModalOpen(false) }}></div>
                        <div className='h-[450px] w-96 absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-l'>
                            <div className={`bg-white h-[450px] w-96 relative ${isModalOpen && 'animate-fadein'} shadow-xl shadow-palette-green`}>
                                <button className='absolute right-3 top-3' onClick={() => setIsModalOpen(false)}><FaTimes color='#191A19' className='w-8 h-8' /></button>
                                <div className='flex items-center px-2'>
                                    <img src={memberImage} className='w-32 h-32' alt="create team" />
                                    <h1 className='font-righteous text-xl text-palette-dark ml-2'>Invite Member</h1>
                                </div>
                                <form onSubmit={addMember} className='flex flex-col gap-1 px-3 font-jost'>
                                    <label htmlFor='name' className='mt-2 font-semibold'>Name</label>
                                    <input name="name" type="text" onChange={handleChange} className='w-full h-10 bg-palette-gray px-2 rounded-md outline-none border-2 focus:border-palette-lightgreen' />
                                    <label htmlFor='img' className='mt-2 font-semibold'>Image URL</label>
                                    <input name="img" type="text" onChange={handleChange} className='w-full h-10 bg-palette-gray px-2 rounded-md outline-none border-2 focus:border-palette-lightgreen' />
                                    <button className='w-full h-12 mt-4 rounded-md bg-palette-lightgreen text-white transition-all duration-700 ease-in-out hover:tracking-widest'>Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
    </TeamPage>
  )
}

export default Members