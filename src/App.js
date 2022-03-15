import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home, Login, Dashboard, MyTeams, Team, Members } from './pages'
import { useDispatch, useSelector } from 'react-redux';
import { login, validate } from './features/user/userSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user)
  // console.log(user);
  useEffect(()=>{
    console.log(user)
    dispatch(validate()); 
    
    console.log("validar")
  },[]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/teams' element={<MyTeams />} />
        <Route path='/dashboard/team/:id' element={<Team />} />
        <Route path='/dashboard/team/members' element={<Members />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
