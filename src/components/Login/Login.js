import React, { useState } from "react";
import "./Login.css";
export const Login = (props) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
    }

    return (
        <div className="loginpage">
        <div className="auth-form-container">
            <h2>Enter Username</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                {/* <label htmlFor="user">username</label> */}
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="user" placeholder="" id="user" name="user" />
                <button type="submit">Start Playing</button>
            </form>
        </div>
        </div>
    )
}