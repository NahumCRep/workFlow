import React, { useState, useEffect } from 'react'
import DashboardPage from '../../components/layouts/DashboardPage'
import create from '../../assets/images/teamup.svg'
import { FaTimes } from 'react-icons/fa'
import Loader from '../../components/Loader'
import TeamCard from '../../components/dashboard/TeamCard'
import { get, post } from '../../api'
import { useSelector } from 'react-redux'


const MyTeams = () => {
    const user = useSelector(state =>  state.user)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [allTeams, setAllTeams] = useState(null)
    const [joinedTeams, setJoinedTeams] = useState(null)
    const [teamFormData, setTeamFormData] = useState({
        name: "",
        img: "",
        description: ""
    })

    const handleChange = (e) => {
        setTeamFormData({
            ...teamFormData,
            [e.target.name]: e.target.value
        })
    }

    const getTeams = () => {
       get('/teams/')
       .then(res => {
            let otherTeams = []
            let myTeams = []
            if(user?.id){
                res.data.forEach((datateam) => {
                    if(user.id === datateam.idLeader._id){
                        myTeams.push(datateam)
                    }else{
                        otherTeams.push(datateam)
                    }
                })
                setAllTeams(myTeams)
                setJoinedTeams(otherTeams)
            }
        })
       .catch(error=>console.log(error))
    }

    const addTeam = (event) => {
        event.preventDefault()
        post('/teams',teamFormData)
        .then(res=>{
            setAllTeams([...allTeams,res.data])
        })
        setIsModalOpen(false)
    }

    useEffect(() => {
        getTeams()
    }, [])

    return (
        <DashboardPage>
            <section className='w-full h-auto px-2'>
                <div className='h-20 w-full py-2 '>
                    <div className='w-full h-full bg-palette-beige py-2 px-5 flex justify-between items-center shadow-lg shadow-gray-400 '>
                        <h1 className='text-palette-dark font-righteous text-xl '>My Teams</h1>
                        <button onClick={() => setIsModalOpen(true)} className='font-righteous w-24 h-full transition-all duration-700 ease-in-out hover:w-28 bg-palette-dark text-palette-beige rounded-2xl float-right'>
                            Create
                        </button>
                    </div>
                </div>
                <div className='w-full h-auto min-h-[200px] grid grid-cols-1 md:grid-cols-3 gap-3 p-2 bg-palette-beige mt-3 shadow-lg shadow-gray-500'>
                    {
                        allTeams
                            ? (
                                allTeams.length !== 0
                                    ? (
                                        allTeams.map(team => {
                                            return (
                                                <TeamCard key={team._id} team={team} />
                                            )
                                        })
                                    )
                                    : (
                                        <div className='col-span-full'>
                                            <p className='w-full text-center p-4 font-jost'>0 Teams Created</p>
                                        </div>
                                    )
                            )
                            : <div className='col-span-full'><Loader /></div>
                    }
                </div>
                <div className='w-full h-auto bg-palette-beige my-5 p-2 shadow-lg shadow-gray-500'>
                    <div className='w-full h-14 flex items-center px-3 bg-palette-lightgreen'>
                        <h1 className='text-palette-beige font-righteous text-xl'>Joined Teams</h1>
                    </div>
                    <div className='w-full h-auto min-h-[200px] grid grid-cols-3 gap-2 mt-3 '>
                        {
                            joinedTeams
                                ? (
                                    joinedTeams.length !== 0
                                        ? (
                                            joinedTeams.map(team => {
                                                return (
                                                    <TeamCard key={team.id} team={team} />
                                                )
                                            })
                                        )
                                        : (
                                            <div className='col-span-full'>
                                                <p className='w-full text-center p-4 font-jost'>0 Teams Created</p>
                                            </div>
                                        )
                                )
                                : <div className='col-span-full'><Loader /></div>
                        }
                    </div>
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
                                    <img src={create} className='w-32 h-32' alt="create team" />
                                    <h1 className='font-righteous text-xl text-palette-dark ml-2'>Create Team</h1>
                                </div>
                                <form onSubmit={addTeam} className='flex flex-col gap-1 px-3 font-jost'>
                                    <label htmlFor='name' className='mt-2 font-semibold'>Name</label>
                                    <input name="name" type="text" onChange={handleChange} className='w-full h-10 bg-palette-gray px-2 rounded-md outline-none border-2 focus:border-palette-lightgreen' />
                                    <label htmlFor='img' className='mt-2 font-semibold'>Image URL</label>
                                    <input name="img" type="text" onChange={handleChange} className='w-full h-10 bg-palette-gray px-2 rounded-md outline-none border-2 focus:border-palette-lightgreen' />
                                    <label htmlFor='description' className='mt-2 font-semibold'>Description</label>
                                    <input name="description" type="text" onChange={handleChange} className='w-full h-10 bg-palette-gray px-2 rounded-md outline-none border-2 focus:border-palette-lightgreen' />
                                    <button className='w-full h-12 mt-4 rounded-md bg-palette-lightgreen text-white transition-all duration-700 ease-in-out hover:tracking-widest'>Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </DashboardPage>
    )
}

export default MyTeams