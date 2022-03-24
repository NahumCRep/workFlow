import React from 'react'
import TeamPage from '../../../components/teampage/TeamPage'
import MemberCard from '../../../components/teampage/MemberCard'

const Members = () => {
  return (
    <TeamPage>
        <section className='w-full h-auto p-4 mt-3'>
            <div className='h-12 '>
                <div className='w-full h-full pb-6 border-b-2 border-palette-green flex justify-between items-center font-jost text-lg font-bold '>
                    <h1>Members</h1>
                    <button className='bg-palette-lightgreen px-9 h-10 font-medium rounded-md '>Invite Member</button>
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
    </TeamPage>
  )
}

export default Members