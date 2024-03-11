import React, { useState } from 'react';
import '../Styles/SignIn.sass'; 
import { FaUserAlt, FaLock } from "react-icons/fa";

const SignIn = ({ signIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call signIn function passed from the parent component
        signIn(email, password);
    };

    return (
        <div className="SignIn-container">
            <h1>Sign In</h1>
            <form className="SignIn-form" onSubmit={handleSubmit}>
                <div className='box-in'>
                    <label htmlFor="email"></label>
                  
                    <input
                        className="SignIn-input"
                        type="email"
                        placeholder= "Email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FaUserAlt className='icon'/>
                </div>
                <div className='box-in'>
                    <label htmlFor="password"></label>
                  
                    <input
                        className="SignIn-input"
                        type="password"
                        placeholder= 'Password'
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className='icon'/>
                </div>
                <button className="SignIn-button" type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
