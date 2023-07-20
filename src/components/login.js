import React, { useState } from "react";

export const Login = (props) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="user">username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)}type="user" placeholder="username" id="user" name="user" />
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}