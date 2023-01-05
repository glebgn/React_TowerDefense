import {useState, useContext} from 'react'
import UserContext from './context/userContext';
import {useNavigate} from 'react-router-dom'
import Axios from 'axios';
import './Login.css'


    
export const Login = () =>
{
    // Redirection 
    let handleClick=useNavigate();

    // Login form
    const [formData, setFormData] = useState({
      login : "",
      password: ""
    });
    // Error & Success display 
    const [error,setError] = useState('');
    // User Context
    const {value, setValue} = useContext(UserContext);

    // On button click 
    const onLogin = (evt)=>{
        evt.preventDefault();
        // Send post to API along with form data
        Axios.post("http://localhost:8000/users/login",
            {
                login : formData.login,
                password : formData.password
            },
            {
                headers : {
                    "Content-Type" : "application/json"
                },
                withCredentials : true
            })  
            .then((response) => {
                // Display feedback
                setError(("Logging in!"));
                setFormData({
                    login : "",
                    password: ""
                })
                // console.log(response.data); // DEBUG
                setValue(response.data)
                localStorage.setItem("user", response.data.username)
                // console.log("CHECK LOCAL STORAGE") // DEBUG
                // console.log(localStorage.getItem("user")) // DEBUG
                handleClick("/main")
            })
            .catch(err=>{
                console.log("Error :" + err);
                setError(err.response.data);
            })
    }
    
    return (
            <div className="background">
            <div id="login-box">
                <div className="right">
                    <h1>Sign in</h1>
                    <form  className="form-control" action="" onSubmit={onLogin}>

                        <div>
                            <label htmlFor="login">Nickname</label>
                            <input type="text" required id="login" value={formData.login} onChange={(evt) => {
                                setFormData({ ...formData, login: evt.target.value });
                            }} />
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" required id="password" value={formData.password} onChange={(evt) => {
                                setFormData({ ...formData, password: evt.target.value });
                            }} />
                        </div>

                        <div>
                            <button  type="submit">Login me in</button>
                        </div>
                        <div className ="error">
                            <p>{error}</p>
                        </div>
                    </form>
                </div>
            </div>
            </div>
    )
}