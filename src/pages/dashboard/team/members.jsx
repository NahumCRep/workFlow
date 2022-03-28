import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import TeamPage from '../../../components/layouts/TeamPage'
import MemberCard from '../../../components/teampage/MemberCard'
import Loader from '../../../components/Loader'
import { FaTimes } from 'react-icons/fa'
import { RiMailSendFill } from 'react-icons/ri'
import { get, post } from '../../../api'

const Members = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [teamInfo, setTeamInfo] = useState({})
    const [members, setMembers] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    const params = useParams()
    const memberIDRef = useRef(null)

    const getMembers = () => {
        get("/teams/" + params.id)
            .then(res => {
                console.log('members', res.data.members)
                console.log('team', res.data)
                setTeamInfo(res.data)
                setMembers(res.data.members)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        get('/users')
            .then(res => console.log('usuarios', res.data))
            .catch(error => console.log(error))
        getMembers()
    }, [])


    const addMember = (e) => {
        e.preventDefault()
        if (memberIDRef.current.value !== '') {
            setIsEmpty(false)
            post('/teams/addMember', {
                idTeam: params.id,
                idNewMember: memberIDRef.current.value
            })
                .then(res => {
                    getMembers()
                    setIsModalOpen(false)
                })
                .catch(error => console.log(error))
        } else {
            setIsEmpty(true)
        }
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
                    <div className='h-auto py-2 px-5 bg-palette-dark flex gap-1 text-palette-dark'>
                        {teamInfo?.idLeader && (<>
                            <p className='bg-palette-beige p-2 font-righteous'>Lider</p>
                            <p className='bg-palette-beige p-2 font-jost font-medium'>{teamInfo.idLeader.name}</p>
                            <p className='bg-palette-beige p-2 font-jost font-medium'>{teamInfo.idLeader.email}</p>
                        </>)}
                    </div>
                    {
                        members
                            ? (members.map(member => {
                                return <MemberCard key={member._id._id} teamID={teamInfo._id} memberData={member} refreshMembers={getMembers} />
                            }))
                            : <Loader />
                    }
                </div>
            </section>
            {
                isModalOpen && (
                    <div>
                        <div className='absolute left-0 top-0 h-screen w-screen max-w-full bg-black bg-opacity-30' onClick={() => { setIsModalOpen(false) }}></div>
                        <div className='h-auto w-96 absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-l'>
                            <div className={`bg-white w-full h-full p-4 relative ${isModalOpen && 'animate-fadein'} shadow-xl shadow-palette-green`}>
                                <button className='absolute right-3 top-3' onClick={() => setIsModalOpen(false)}><FaTimes color='#191A19' className='w-8 h-8' /></button>
                                <div className='flex items-center px-2'>
                                    <RiMailSendFill color='#191A19' size={20} />
                                    <h1 className='font-righteous text-xl text-palette-dark ml-2'>Invite Member</h1>
                                </div>
                                <form onSubmit={addMember} className='flex flex-col gap-1 px-2 font-jost'>
                                    <label htmlFor='name' className='mt-2 font-semibold'>Member ID</label>
                                    <input ref={memberIDRef} name="name" type="text" className={`${isEmpty && 'border-2 border-red-500'} w-full h-10 bg-palette-gray px-2 rounded-md outline-none border-2 focus:border-palette-lightgreen`} />
                                    <button className='w-full h-12 mt-4 rounded-md bg-palette-lightgreen text-white transition-all duration-700 ease-in-out hover:tracking-widest'>Send Invitation</button>
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