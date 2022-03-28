import React, { useState } from 'react'
import { FaEdit, FaTimes } from 'react-icons/fa'
import { post, del } from '../../api'

const MemberCard = ({ teamID, memberData, refreshMembers }) => {
    const [isEditingRole, setIsEditingRole] = useState(false)

    const changeMemberRole = (e) => {
        post('/teams/changeRole', {
            idTeam: teamID,
            idMember: memberData._id._id,
            newRole: e.target.value
        }).then(res => {
            setIsEditingRole(false)
            refreshMembers()
        }).catch(error => console.log(error))
    }

    const deleteMember = () => {
        del('/teams/removeMember', { data: {
            idTeam: teamID,
            idMember: memberData._id._id,
        }}).then(res => {
            console.log(res)
            refreshMembers()
        }).catch(error => console.log(error))
    }

    return (
        <div className='w-full h-12 mt-1 bg-palette-beige  divide-x grid grid-cols-4 font-jost text-base '>
            <div className='flex items-center justify-start pl-8 gap-3 h-full'>
                <div className='w-8 h-8 bg-palette-green rounded-full' title="nahum casco"></div>
                <p>{memberData._id.name}</p>
            </div>
            <div className='flex items-center justify-center gap-3'>
                <p>{memberData._id.email}</p>
            </div>
            <div className='flex items-center justify-center gap-2'>
                <p>Role</p>
                {
                    !isEditingRole
                        ? <p>{memberData.role}</p>
                        : (
                            <select onChange={changeMemberRole} defaultValue={memberData.role}>
                                <option value="normal">normal</option>
                                <option value="editor">editor</option>
                                <option value="validator">validator</option>
                            </select>
                        )
                }

            </div>
            <div className='flex items-center justify-center gap-3'>
                <button onClick={() => setIsEditingRole(!isEditingRole)} className='w-32 h-8 bg-palette-dark rounded-md text-palette-beige flex items-center justify-center gap-2'>
                    <FaEdit />
                    {isEditingRole ? "Stop Editing" : "Edit Role"}
                </button>
                <button onClick={() => deleteMember()} className='w-10 h-8 bg-red-700 rounded-md flex justify-center items-center'><FaTimes /></button>
            </div>
        </div>
    )
}

export default MemberCard