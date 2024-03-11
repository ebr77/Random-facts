import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/SignUp.sass'; 
import { FaUserAlt, FaLock } from "react-icons/fa"
import { RiPencilFill } from "react-icons/ri";

const SignUp = ({ signUp }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('your-signup-endpoint', {
                username,
                email,
                password
            });
            
            // Call signUp function passed from the parent component
            signUp(username, email, password);
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="SignUp-container">
            <h1>Sign Up</h1>
            <form className="SignUp-form" onSubmit={handleSubmit}>
                <div className='box'>
                    <label htmlFor="username"></label>
                    <input 
                        className="SignUp-input"
                        type="text" 
                        placeholder='Username'
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <FaUserAlt className='icon'/>
                </div>
                <div className='box'>
                    <label htmlFor="email"></label>
                    <input 
                        className="SignUp-input"
                        type="email"
                        placeholder='Email' 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <RiPencilFill className='icon'/>
                </div>
                <div className='box'>
                    <label htmlFor="password"></label>
                    <input 
                        className="SignUp-input"
                        type="password" 
                        placeholder='Password'
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <FaLock className='icon'/>
                </div>
                <button className="SignUp-button" type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
