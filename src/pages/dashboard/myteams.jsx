import React from 'react'
import DashboardPage from '../../components/dashboard/DashboardPage'
import create from '../../assets/images/teamup.svg'


const MyTeams = () => {
    const teams = ''
    return (
        <DashboardPage>
            <section className='w-full'>
                <div className='h-14 w-full bg-palette-lightgreen'>
                
                </div>
                <div className='w-full h-full min-h-screen'>
                    {
                        teams !== ''
                        ? <h1>si hay</h1> 
                        : (
                            <div className='w-full h-full flex flex-col items-center pt-11'>
                                <img src={create} className='w-1/2 h-1/2' alt='create image' />
                                <button className='w-56 h-12 bg-palette-lightgreen font-jost text-2xl font-semibold text-palette-dark transition-shadow duration-700 ease-in-out hover:shadow-lg hover:shadow-palette-green'>
                                    Create a Team
                                </button>
                            </div>
                        ) 
                    }
                </div>
            </section>
        </DashboardPage>
    )
}

export default MyTeams