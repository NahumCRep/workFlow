import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
//components
import TeamPage from '../../../components/layouts/TeamPage'
import Loader from '../../../components/Loader'
import GroupCreateModal from '../../../components/modals/GroupCreateModal'
import GroupCard from '../../../components/teampage/GroupCard'
//api
import { get } from '../../../api'
//icons
import { FaPlus } from 'react-icons/fa'

const Team = () => {
  const params = useParams()
  const [groups, setGroups] = useState(null)
  const [pageTeam, setPageTeam] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    get("/teams/" + params.id)
      .then(res => {
        console.log('team', res.data)
        setPageTeam(res.data)
        setGroups(res.data.lists)
      })
      .catch(error => console.log(error))
  }, [])

  const getGroups = () => {
    get("/teams/" + params.id)
      .then(res => {
        setGroups(res.data.lists)
      })
      .catch(error => console.log(error))
  }

  return (
    <TeamPage>
      <section>
        <article>
          <div className='w-full h-[300px] bg-palette-dark relative border-x-8 border-b-8 border-palette-dark shadow-lg shadow-gray-500'>
            {
              pageTeam
                ? (
                  <>
                    <img src={pageTeam.img} alt="cover" className='w-full h-full object-cover  opacity-50' />
                    <div className='w-auto h-16 px-5 flex justify-center items-center bg-palette-dark absolute bottom-0 left-0'>
                      <p className='font-jost text-palette-beige text-lg '>{pageTeam.description}</p>
                    </div>
                  </>
                )
                : <Loader />
            }
          </div>
          <h1 className='font-righteous text-xl text-palette-dark p-6 mt-2'>My Groups</h1>
          <div className='w-full h-auto px-6 grid grid-cols-4 gap-2 mt-2'>
            <button onClick={() => setIsModalOpen(true)} className='h-40 flex justify-center items-center bg-palette-gray border-2 transition-color duration-1000 ease-in-out hover:bg-green-100 hover:border-green-200 '><FaPlus color='#191A19' size={25} /></button>
            {
              groups
                ? (
                  groups.length > 0
                  ? (
                    groups.map((group) => {
                      return (
                        <GroupCard key={group._id} groupID={group._id} list={group} refreshData={getGroups} />
                      )
                    })
                  )
                  : <div className='h-40 flex justify-center items-center bg-palette-gray font-jost'>0 groups</div>
                )
                : <Loader />
            }
          </div>
        </article>
      </section>
      {
        isModalOpen && <GroupCreateModal teamID={pageTeam._id} modalState={isModalOpen} setModalOpen={setIsModalOpen} refreshData={getGroups} />
      }
    </TeamPage>
  )
}

export default Team