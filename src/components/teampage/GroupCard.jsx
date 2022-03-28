import React, { useState } from 'react'
import { TiGroup } from 'react-icons/ti'
import { GoGear } from 'react-icons/go'
import GroupOptionsModal from '../modals/GroupOptionsModal'
import { useSelector } from 'react-redux'

const GroupCard = ({ groupID, list, refreshData }) => {
    const [optionModalOpen, setOptionModalOpen] = useState(false)
    const userRole = useSelector(state => state.team)
    return (
        <div className='h-40 flex flex-col gap-1 bg-palette-dark p-3 font-jost overflow-x-hidden'>
            <div>
                <div className='flex justify-between items-center'>
                    <TiGroup color='#D8E9A8' size={25} />
                    {
                        userRole && (
                            userRole === 'lider' && (
                                <GoGear
                                    className='cursor-pointer transition-transform duration-1000 ease-in-out hover:rotate-90'
                                    title='options'
                                    color='#D8E9A8'
                                    size={25}
                                    onClick={() => setOptionModalOpen(true)}
                                />
                            )
                        )
                    }
                </div>
                <h1 className='text-lg font-medium text-palette-beige'>{list.name}</h1>
            </div>
            <p className='text-palette-lightgreen text-sm h-20 border-2 border-dotted border-palette-lightgreen px-1'>{list.description}</p>
            <div className='text-sm flex gap-1 items-center text-palette-beige'>
                <p className=''>Tasks:</p>
                <p>{list.tasks.length}</p>
            </div>
            {
                optionModalOpen && <GroupOptionsModal group={groupID} listModalState={optionModalOpen} listData={list} setModalOpen={setOptionModalOpen} refreshGroups={refreshData} />
            }
        </div>
    )
}

export default GroupCard