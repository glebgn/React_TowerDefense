import { useState } from 'react'
import './Register.css'


export const Register = () => {

    const [formData, setFormData] = useState({
        user_nickname: "",
        email: "",
        password: "",
        password_verification: ""
    });
    const [error, setError] = useState('');

    const onCreateAccount = (evt) => {
        evt.preventDefault();
        fetch(`http://localhost:8000/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(json => {

                // TODO Will proble want to move them towards home instead of sending them this message
                setError(json);
                setFormData({
                    user_nickname: "",
                    email: "",
                    password: "",
                    password_verification: ""
                })

            })
            .catch(err => {
                alert(err);
                console.log(`Error ${err}`);
            })
    }

    return (
        <div id="login-box">
            <div className="left">
                <h1>Sign up</h1>
                <form className="form-control" action="" onSubmit={onCreateAccount}>

                    <div>
                        <label htmlFor="user_nickname">Nickname</label>
                        <input type="text" required id="user_nickname" value={formData.user_nickname} onChange={(evt) => {
                            setFormData({ ...formData, user_nickname: evt.target.value });
                        }} />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" required id="email" value={formData.email} onChange={(evt) => {
                            setFormData({ ...formData, email: evt.target.value });
                        }} />
                    </div>


                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" required id="password" value={formData.password} onChange={(evt) => {
                            setFormData({ ...formData, password: evt.target.value });
                        }} />
                    </div>

                    <div>
                        <label htmlFor="password_verification">Confirm Password</label>
                        <input type="password" required id="password_verification" value={formData.password_verification} onChange={(evt) => {
                            setFormData({ ...formData, password_verification: evt.target.value });
                        }} />
                    </div>
                    <div>
                        <button type="submit">SIGN ME UP</button>
                    </div>
                    <div className="error">
                        <p>{error}</p>
                    </div>
                </form>
            </div>
        </div>
    )
}