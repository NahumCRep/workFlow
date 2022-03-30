import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home, Login, SignUp, Dashboard, MyTeams, Team, Members, Tasks } from './pages'
import { useDispatch, useSelector } from 'react-redux';
import { validate } from './features/user/userSlice';

function App() {
  const dispatch = useDispatch();
  // const user = useSelector(state=>state.user)

  useEffect(()=>{
    dispatch(validate()); 
  },[]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/teams' element={<MyTeams />} />
        <Route path='/dashboard/team/:id' element={<Team />} />
        <Route path='/dashboard/team/:id/members' element={<Members />} />
        <Route path='/dashboard/team/:id/tasks' element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
