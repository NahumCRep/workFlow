import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TeamPage from '../../../components/teampage/TeamPage'
import { useDispatch } from 'react-redux'
import { setTeam } from '../../../features/team/teamSlice'
import { get } from '../../../api'

const Team = () => {
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(()=>{
    console.log('params', params)
    get("/teams/"+params.id)
    .then(res=>{
        // setTeam(res.data)
        console.log(res.data)
        dispatch(setTeam(res.data))
    })
    .catch(error=>console.log(error))
  },[])

  return (
    <TeamPage name={'Front End'}>
      <h1>team</h1>
    </TeamPage>
  )
}

export default Team