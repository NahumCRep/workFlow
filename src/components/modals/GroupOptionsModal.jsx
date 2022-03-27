import { list } from 'postcss'
import React, { useState, useEffect, useRef } from 'react'
import { FaTimes } from 'react-icons/fa'
import { GoGear } from 'react-icons/go'
import { put, del } from '../../api'

const GroupOptionsModal = ({ group, listModalState, listData, setModalOpen, refreshGroups }) => {
    const [optionDescription, setOptionDescription] = useState(listData.description)
    const [actionOption, setActionOption] = useState('edit')
    const [verificationError, setVerificationError] = useState({
        error: false,
        message: ""
    })
    const textField = useRef(null)

    const changeAction = (actionSelected) => {
        setActionOption(actionSelected)
        actionSelected == 'edit'
            ? textField.current.value = listData.description
            : textField.current.value = ""
    }

    const clearErrorState = () => {
        setVerificationError({
            error: false,
            message: ''
        })
    }

    const updateGroup = (newDescription) => {
        clearErrorState()
        if (newDescription !== '') {
            put(`/lists/${listData._id}`, {description: newDescription})
                .then(res =>{
                    refreshGroups()
                    setModalOpen(false)
                })
                .catch(error => console.error(error))
        } else {
            setVerificationError({
                error: true,
                message: 'ingrese una descripcion'
            })
        }
    }

    const deleteGroup = (comparationName) => {
        clearErrorState()
        if(comparationName === listData.name){
            del(`/teams/${group}/removeList/${listData._id}`)
            .then(res => {
                refreshGroups()
                setModalOpen(false)
            })
            .catch(error => console.error(error))
        }else{
            setVerificationError({
                error: true,
                message: 'el nombre no coincide'
            })
        }
    }

    const executeAction = (e) => {
        e.preventDefault()
        if(actionOption == 'edit'){
            updateGroup(textField.current.value)
        }else{
            deleteGroup(textField.current.value)
        }
    }


    return (
        <div>
            <div className='absolute left-0 top-0 h-screen w-screen max-w-full text-palette-dark bg-black bg-opacity-30' onClick={() => { setModalOpen(false) }}></div>
            <div className='h-auto w-[80%] md:w-96 absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-l'>
                <div className={`bg-white h-full w-full px-2 py-3 relative ${listModalState && 'animate-fadein'} shadow-md shadow-palette-green`}>
                    <button className='absolute right-3 top-3' onClick={() => setModalOpen(false)}><FaTimes color='#191A19' className='w-8 h-8' /></button>
                    <div className='text-palette-dark'>
                        <span className='flex items-center gap-1'><GoGear color='#191A19' className='mt-1' />  group options</span>
                        <h1 className='font-jost text-xl font-semibold'>&#8594;{listData.name}</h1>
                    </div>
                    <div className='w-full h-11 flex mt-4 '>
                        <button onClick={() => changeAction('edit')} className={`flex-grow ${actionOption == 'edit' ? 'btn-active' : 'bg-palette-gray text-palette-dark boder-none'} `}>edit</button>
                        <button onClick={() => changeAction('delete')} className={`flex-grow ${actionOption == 'delete' ? 'btn-active' : 'bg-palette-gray text-palette-dark boder-none'} `}>delete</button>
                    </div>
                    <form onSubmit={executeAction} className='flex flex-col gap-1 font-jost mt-6 '>
                        <label htmlFor='textfield' className='font-semibold'>
                            {
                                actionOption == 'edit'
                                    ? 'Description'
                                    : 'insert the name of the group to delete'
                            }
                        </label>
                        <input
                            name="textfield"
                            type="text"
                            ref={textField}
                            defaultValue={optionDescription}
                            className='w-full h-10 bg-palette-gray px-2 rounded-md outline-none border-2 focus:border-palette-lightgreen'
                        />
                        <p className={`text-red-500 h-4 ${verificationError.error ? 'visible' : 'invisible'} `}>{verificationError.message}</p>
                        <button className='w-full h-12 mt-1 rounded-md bg-palette-lightgreen text-white transition-all duration-700 ease-in-out hover:tracking-widest'>Accept</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GroupOptionsModal