import { useNavigate } from "react-router-dom";
import logo from "../images/GroupSoup.png"
import supabase from "../supabaseClient.jsx";

function Landing() {
    const navigate = useNavigate();

    const handleBusinessSignUp = async () => {
        const descriptors = await supabase.from(`descriptors_table`).select("*");
        console.log(descriptors);
        navigate('/businessSignup/Descriptors', {state : {...descriptors}});
    }

    return (
        <div className="gradientBackground">

            <section>
                <img src={logo} id="LandingLogo" alt="logo"></img>
            </section>

            <section>
                <button className="submitButton" onClick={() => navigate('/login', {state : { type : "user"}})}> Sign in (user) </button>
                <div id="LandingBar"></div>
            </section>

            <section>
                <button className="submitButton" onClick={() => navigate('/login', {state : { type : "business"}})}> Sign in (business) </button>
                <div id="LandingBar"></div>
            </section>


            <section id="SignInOptions"> 
                <button> Sign in with </button>
                <button> Sign in with </button>
                <button> Sign in with </button>
                <button> Sign in with </button>
                <p> Don't have an account? <a onClick={() => navigate('/signup')}> Sign up </a></p>
                <p> Is bro a business? LMAO <a onClick={handleBusinessSignUp}>Sign up here</a> </p>
            </section>

        </div>  
    )
}




export default Landing;