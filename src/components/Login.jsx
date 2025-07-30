import { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom"
import supabase from "../supabaseClient.jsx"

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();
    const type = location.state?.type

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password});

        if (error) {
            console.log('WRONG');
            console.error(error);
        } else {
            localStorage.setItem('supabaseSession', JSON.stringify( data.session )); 
            setEmail('');
            setPassword('');
            if(type === 'business'){
                navigate('/businessDashboard');
            } else {
                navigate('/home');
            }
        }
    }

    return (
        <div className="gradientBackground">
            <h1> Let's make things happen IRL.</h1>

            <section>
                <form id="LoginForm" onSubmit={handleSubmit}>
                    <input type="text" id="username" name="username" placeholder="Email or Phone Number" onChange={(e) => setEmail(e.target.value)} required></input>
                    <div className="loginBar"></div>
                    <input type="password" id="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required></input>
                    <div className="loginBar"></div> 

                    <button type="submit" className="submitButton"> Sign in</button>
                </form>
               
                
                <p className="mt-5"> Don't have an account? <a onClick={() => navigate('/signUp')}> Sign up </a> </p>
            </section>

            <section>
                <button className="backButton" onClick={() => navigate('/')}> Take me back! </button>
            </section>
        </div>
    )
}



export default Login