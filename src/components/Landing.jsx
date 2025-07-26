import { useNavigate } from "react-router-dom";
import logo from "../images/GroupSoup.png"

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="gradientBackground">

            <section>
                <img src={logo} id="LandingLogo" alt="logo"></img>
            </section>

            <section>
                <button className="submitButton" onClick={() => navigate('/login')}> Sign in </button>
                <div id="LandingBar"></div>
            </section>

            <section id="SignInOptions"> 
                <button> Sign in with </button>
                <button> Sign in with </button>
                <button> Sign in with </button>
                <button> Sign in with </button>
                <p> Don't have an account? <a onClick={() => navigate('/signup')}> Sign up </a></p>
                <p> Is bro a business? LMAO <a onClick={() => navigate('/businessSignup')}>Sign up here</a> </p>
            </section>

        </div>  
    )
}

export default Landing;