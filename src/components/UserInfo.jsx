import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import supabase from "../supabaseClient.jsx";

export function UserInfo () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const navigation = useNavigate();

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
        let user = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data : {
                    username: username
                }
            }
        })
        console.log(user.data.session);

        if(user.error){
            console.error("Something went wrong. Please try again later");
            console.error(user.error.message)
        } else {
            localStorage.setItem("supabaseSession", JSON.stringify(user.data.session));
            navigation('../account')
        }

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
                <h1 className={ submitted ? (isValid ? "hidden" : "visible") : "hidden"}>You did NOT put in any values LMAO</h1>
            </div>
        </div>
    )
}

