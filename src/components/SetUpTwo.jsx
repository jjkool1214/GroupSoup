import { useNavigate } from "react-router-dom"

const SetUpTwo = () => {
    const navigate = useNavigate();

    return (
        <div className="gradientBackground">
            <section>
                <h1>How about your personal recipe?</h1>
                <p>Choose up to 10 options</p>
            </section>

            <section>
                <form onSubmit={(e)=>{e.preventDefault(); navigate('./../steptwo')}}>
                    <h2>Your Identities</h2>

                    <div className="signUpContainer">
                        <label htmlFor="women" className="signUpBox"> 
                            Women
                            <input type="checkbox" id="women" className="hidden"></input>
                        </label>
                        <label htmlFor="men" className="signUpBox"> 
                            Men
                            <input type="checkbox" id="men" className="hidden"></input>
                        </label>
                    </div>
                    <div className="signUpContainer">
                        <label htmlFor="nonBinary" className="signUpBox"> 
                            Non-Binary
                            <input type="checkbox" id="nonBinary" className="hidden"></input>
                        </label>
                        <label htmlFor="transgender" className="signUpBox"> 
                            Transgender
                            <input type="checkbox" id="transgender" className="hidden"></input>
                        </label>
                    </div>
                    <div className="signUpContainer">
                        <label htmlFor="LGBTQ" className="signUpBox"> 
                             LGBTQIA+
                            <input type="checkbox" id="LGBTQ" className="hidden"></input>
                        </label>
                        <label htmlFor="POC" className="signUpBox"> 
                            POC
                            <input type="checkbox" id="POC" className="hidden"></input>
                        </label>
                    </div>

                    <h2> Your Age </h2>

                    <div className="signUpContainer">
                        <label htmlFor="18-20" className="signUpBox"> 
                            18-20
                            <input type="checkbox" id="18-20" className="hidden"></input>
                        </label>
                        <label htmlFor="21-29" className="signUpBox"> 
                            21-29
                            <input type="checkbox" id="21-29" className="hidden"></input>
                        </label>
                    </div>
                    <div className="signUpContainer">
                        <label htmlFor="30-39" className="signUpBox"> 
                            30-39
                            <input type="checkbox" id="30-39" className="hidden"></input>
                        </label>
                        <label htmlFor="40-49" className="signUpBox"> 
                            40-49
                            <input type="checkbox" id="40-49" className="hidden"></input>
                        </label>
                    </div>
                    <div className="signUpContainer">
                        <label htmlFor="50-64" className="signUpBox"> 
                            50-64
                            <input type="checkbox" id="50-64" className="hidden"></input>
                        </label>
                        <label htmlFor="65" className="signUpBox"> 
                            65+
                            <input type="checkbox" id="65" className="hidden"></input>
                        </label>
                    </div>

                    <h2>Ideal Schedule</h2>

                    <div className="signUpContainer">
                        <label htmlFor="1pm" className="signUpBox"> 
                            1hr per month
                            <input type="checkbox" id="1pm" className="hidden"></input>
                        </label>
                        <label htmlFor="1bw" className="signUpBox"> 
                            1hr bi-weekly
                            <input type="checkbox" id="1bw" className="hidden"></input>
                        </label>
                    </div>
                    <div className="signUpContainer">
                        <label htmlFor="1pw" className="signUpBox"> 
                            1hr per week
                            <input type="checkbox" id="1pw" className="hidden"></input>
                        </label>
                        <label htmlFor="2pw" className="signUpBox"> 
                            2hrs per week
                            <input type="checkbox" id="2pw" className="hidden"></input>
                        </label>
                    </div>
                    <div className="signUpContainer">
                        <label htmlFor="3pw" className="signUpBox"> 
                            3hrs per week
                            <input type="checkbox" id="3pw" className="hidden"></input>
                        </label>
                        <label htmlFor="scheduleNoLimits" className="signUpBox"> 
                            No limits
                            <input type="checkbox" id="scheduleNoLimits" className="hidden"></input>
                        </label>
                    </div>

                    <section className="signUpNav">
                        <button type="button" className="signUpNext" onClick={()=>navigate('./../stepone')}> &#8656; </button>
                        <button type="submit" className="signUpNext"> &#8658; </button>
                    </section>
                    
                </form>
            </section>
            
        </div>
    )
}

export default SetUpTwo