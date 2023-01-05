/* eslint-disable react/jsx-no-undef */
import './Navbar.css';
import UserContext from './context/userContext';
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom'

export const NavBar = () => {

    // Redrict
    let handleClick=useNavigate();
    // Global Var
    const {value, setValue} = useContext(UserContext);

    return (
        <div className="topNav">
            <p onClick={() => { handleClick('/'); window.location.reload(false);}}>Home</p>
            <div className="split">
            <p onClick={()=> { handleClick('/about'); window.location.reload(false);}} >About</p>
            {value ? null : <p onClick={()=> {handleClick('/login');}} className="split">Login</p> }
            {value ? null : <p onClick={()=> {handleClick('/register');}} className="split">Register</p> } 
            </div>  
        </div> 
    )

    /*  
            

    For debug
            <p onClick={()=> {handleClick('/main');}} className="split nav">[MAIN]    </p>
            <p onClick={()=> {handleClick('/leaderBoard');}} className="split nav">[LEADERBOARD]</p>
            <p onClick={()=> {handleClick('/gameStore');}} className="split nav">[GAMESTORE]</p>
            <p onClick={()=> {handleClick('/game');}} className="split nav">[GAME]</p>
    */
}

export default NavBar;