import { Routes, Route, Navigate} from 'react-router-dom';
import React, {useEffect,useContext, useState} from 'react';
import Axios from 'axios';

import { About } from './components/about';
import { Home } from './components/home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { GameStore } from './components/gameStore';
import { LeaderBoard } from './components/leaderBoard';
import { Game } from './components/td_game/game';
import { MainMenu } from './components/Mainmenu';
import NavBar from './components/Navbar';
import FooterPage from './components/footer';
import UserContext, { UserProvider } from './components/context/userContext';


// Routing 
function App() {

  // User context
  const [value, setValue] = useState()

  // session checker, to see if person is still logged in
  // Not sure if continue to use 
  useEffect(()=>{
      Axios.get("http://localhost:8000/login",
      {
          withCredentials : true
      }).then((response)=>{
        // Grab
        const tmp = response.data.user;
        console.log({tmp}) // Debug
        // Set
        setValue(tmp);
      })
    },[]
  )

  // console.log(value===undefined) // Debug
  
  return (
    <UserContext.Provider value={{value,setValue}}>
      <NavBar/>
      <Routes>
        <Route path='/' element={value ? <Navigate  to="/main" /> : <Home/> }></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/login' element={value ? <MainMenu/> : <Login/>}></Route>
        <Route path='/register' element={value ? <MainMenu/> : <Register/> }></Route>
        <Route path='/gameStore' element={value ? <GameStore/> : <Home/> }></Route>
        <Route path='/leaderBoard' element={value ? <LeaderBoard/> : <Home/>}></Route>
        <Route path='/game' element={value ? <Game/> : <Home/>}></Route>
        <Route path='/main' element={value ? <MainMenu/> : <Home/>}></Route>
      </Routes>
      <FooterPage/>
    </UserContext.Provider>
  );
}

export default App;