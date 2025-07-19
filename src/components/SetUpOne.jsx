import { useNavigate } from "react-router-dom"

function SetUpOne() {
    const navigate = useNavigate();

    return (
        <div className="gradientBackground">
            <section>
                <h1>Let's start with your social diet preferences.</h1>
                <p>Choose up to 10 options</p>
            </section>

            <section>
                <form onSubmit={(e)=>{e.preventDefault(); navigate('./../steptwo')}}>
                    <h2>Personal goals</h2>

                    <div className="signUpContainer">
                        <label htmlFor="meetMorePeople" className="signUpBox"> 
                            Meet more people
                            <input type="checkbox" id="meetMorePeople" className="hidden"></input>
                        </label>
                        <label htmlFor="meetBasedOnInterest" className="signUpBox"> 
                            Meet based on interest
                            <input type="checkbox" id="meetBasedOnInterest" className="hidden"></input>
                        </label>
                    </div>
                    <div className="signUpContainer">
                        <label htmlFor="expandNetwork" className="signUpBox"> 
                            Expand network    
                            <input type="checkbox" id="expandNetwork" className="hidden"></input>
                        </label>
                        <label htmlFor="findNewHobbies" className="signUpBox"> 
                            Find new hobbies
                            <input type="checkbox" id="findNewHobbies" className="hidden"></input>
                        </label>
                    </div>
                    <div className="signUpContainer">
                        <label htmlFor="discoverMyArea" className="signUpBox"> 
                            Discover my area
                            <input type="checkbox" id="discoverMyArea" className="hidden"></input>
                        </label>
                        <label htmlFor="fillMyCalendar" className="signUpBox"> 
                            Fill my calendar
                            <input type="checkbox" id="fillMyCalendar" className="hidden"></input>
                        </label>
                    </div>

                    <h2>Preferred crowd size</h2>

                    <div className="signUpContainer">
                        <label htmlFor="small" className="signUpBox"> 
                            Small
                            <input type="checkbox" id="small" className="hidden"></input>
                        </label>
                        <label htmlFor="medium" className="signUpBox"> 
                            Medium
                            <input type="checkbox" id="medium" className="hidden"></input>
                        </label>
                    </div>
                    <div className="signUpContainer">
                        <label htmlFor="large" className="signUpBox"> 
                            Large  
                            <input type="checkbox" id="large" className="hidden"></input>
                        </label>
                        <label htmlFor="extraLarge" className="signUpBox"> 
                            Extra large
                            <input type="checkbox" id="extraLarge" className="hidden"></input>
                        </label>
                    </div>
                    <div className="signUpContainer">
                        <label htmlFor="beyond" className="signUpBox"> 
                            Beyond!
                            <input type="checkbox" id="beyond" className="hidden"></input>
                        </label>
                        <label htmlFor="sizeNoLimits" className="signUpBox"> 
                            No limits
                            <input type="checkbox" id="sizeNoLimits" className="hidden"></input>
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
                        <button type="button" className="signUpNext" onClick={()=>navigate('./../')}> &#8656; </button>
                        <button type="submit" className="signUpNext"> &#8658; </button>
                    </section>
                    
                </form>
            </section>
        </div>
    )
}

export default SetUpOne