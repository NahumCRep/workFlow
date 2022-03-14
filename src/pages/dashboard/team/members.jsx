import React from 'react'
import TeamPage from '../../../components/teampage/TeamPage'
import MemberCard from '../../../components/teampage/MemberCard'

const Members = () => {
  return (
    <TeamPage>
        <section className='w-full h-auto p-4'>
            <div className='h-12 '>
                <div className='w-full h-full border-b-2 border-palette-lightgreen flex justify-between items-center'>
                    <h1>Members</h1>
                    <button>Add Member</button>
                </div>
            </div>
            <div className='w-full h-full bg-slate-600'>
            <MemberCard />
            </div>
            
        </section>
    </TeamPage>
  )
}

export default Members