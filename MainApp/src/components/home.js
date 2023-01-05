import './home.css';
import {useNavigate} from 'react-router-dom'

export const Home = () => {
  let handleClick=useNavigate();
	return (
		<div className='align_main'>
			<p className="home"> Returning User? Click here to login! </p>
			<button onClick={()=> {handleClick('/login');}}>Login</button> 
			<p className="home"> New User? Click here to register with us! </p>
			<button onClick={()=> {handleClick('/register');}}>Register</button> 
		</div>	
	);
} 