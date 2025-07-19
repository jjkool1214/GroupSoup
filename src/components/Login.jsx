import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate();

    return (
        <div id="Login">
            <h1> Let's make things happen IRL.</h1>

            <section>
                <form id="LoginForm">
                    <input type="text" id="username" name="username" placeholder="Email or Phone Number"></input>
                    <div className="loginBar"></div>
                    <input type="password" id="password" name="password" placeholder="Password"></input>
                    <div className="loginBar"></div>
                </form>
                <button type="submit" className="submitButton" onClick={() => navigate('/Home')}> Sign in</button>
                <p> Don't have an account? <a onClick={() => navigate('/signUp')}> Sign up </a> </p>
            </section>

            <section>
                <button className="backButton" onClick={() => navigate('/')}> Take me back! </button>
            </section>
        </div>
    )
}

export default Login