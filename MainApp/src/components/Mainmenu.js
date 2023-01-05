import './Mainmenu.css'
import {useNavigate} from 'react-router-dom'
import Axios from 'axios';
import UserContext from './context/userContext';
import { useContext } from 'react';
import mainImg from './td_game/spritesheets/defenders.png';

export const MainMenu = () => {

    // Global Var
    const {value, setValue} = useContext(UserContext);
    const handleClick=useNavigate();
    
    const logOut = ()=>{
        Axios.get("http://localhost:8000/logout",
        {
            withCredentials : true
        }).then((response)=>{
          console.log(response)
          setValue("");
          localStorage.removeItem("user")
          handleClick("/")
        })
        .catch((err) => {
            console.log(err)
            setValue("");
            handleClick("/")
        })
    }


    /*
          <div className="main_root">
                <div className="main_logo"><img src={mainImg} alt='Rock' width="1200px" height="900px"></img></div>
                
                <div className='main_menu'> 
                <div className='welc'>
                <p className='main_user'>{"Welcome, " + value.username + "!"}</p>
                <p className='main_user'>{"Credits " + credits}</p>
                <p className='main_user'>{"Your highest score " + score}</p>
                </div>
                <button onClick={()=> {handleClick('/game')}}>Start</button>
                <button onClick={()=> {handleClick('/gameStore')}}>Store</button>
                <button onClick={()=> {handleClick('/leaderBoard')}}>LeaderBoard</button>
                <button onClick={logOut}>Logout</button>
            </div>
        </div>
        
        */

	return (        
        <div className="main_root">

                <div className="align">
                <img src={mainImg} alt='Rock' width="1200px" height="900px"></img>
                </div>
                <div className="menu">
                <div className="main-user">
                {value.score == undefined  ? (<div><p className="welc">...</p>
                <p className="welc">...</p>
                <p className="welc">...</p></div>) : (<div><p className="welc">{"Welcome, " + value.username + "!"}</p>
                <p className="welc">{"Your highest score: " + value.score}</p>
                <p className="welc">{"Your available credits: " + value.credits}</p></div>)}
                
                

                <button onClick={()=> {handleClick('/game')}}>Start</button>
                <button onClick={()=> { handleClick('/gameStore')}}>Store</button>
                <button onClick={()=> {handleClick('/leaderBoard')}}>LeaderBoard</button>
                <button onClick={logOut}>Logout</button>
                </div>

                </div>

                

        </div>
        
	);
} 
