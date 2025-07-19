import burger from '../images/Burger.webp'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'
import {useState} from "react";
import supabase from "../supabaseClient.jsx";

export function UserInfo () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const checkEmail = (email) => {
        return email !== '' && email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    }
    const handleClick = async () => {
        console.log("username: " + username + " password: " + password + " email: " + email);
        setSubmitted(true);
        if(username === '' || password === '' || !checkEmail(email)){
            setIsValid(false);
            return;
        }
        await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                username: username
            }
        })
    }

    return (
        <div>
            <div>
                <label htmlFor="username" >User Name</label>
                <input type={"text"} onChange={(e) => setUsername(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="password" >Password</label>
                <input type={"text"} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="email" >email</label>
                <input type={"text"} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <button onClick = {(e) => handleClick(e)}>
                Sign up
            </button>
            <div>
                <h1 className={ submitted ? isValid ? "hidden" : "visible" : "hidden"}>You did NOT put in any values LMAO</h1>
            </div>
        </div>
    )
}

