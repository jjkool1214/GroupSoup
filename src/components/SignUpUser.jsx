import { useNavigate } from "react-router-dom"
import supabase from "../supabaseClient.jsx";
import {useState} from "react";


const SignUpUser = () => {
    const navigate = useNavigate();

    const handleQuestionnaireNavigate = async () => {
        const groupings = {}
        const response = await supabase
                                                                            .from('tag_table')
                                                                            .select(`id, name,
                                                                        category (
                                                                            name
                                                                        )`);

        console.log(response)
        response?.data.forEach((item) => {
            let tag = {}
            tag[item.name] = item.id
            //TODO Find an easier way to do this shit
            if(Object.keys(groupings).includes(item.category.name)) {
                groupings[item.category.name].push(tag);
            } else {
                groupings[item.category.name] = [];
                groupings[item.category.name].push(tag);
            }
        })
        console.log(groupings)
        navigate('./Questionnaire', {state : {chosen : [], update : false}});
    }



    return (
        <div className="gradientBackground">
            <h1>
                Finally, you're here! Ready to stir things up together?
            </h1>

            <section>
                <button className="submitButton" type="submit" onClick={handleQuestionnaireNavigate}> Hell yea!</button>
                <p className="mt-5"> Already have an account? <a href="/login"> Sign in </a> </p>
            </section>

            <section>
                <button className="backButton" onClick={() => navigate('/')}> Take me back! </button>
            </section>

        </div>
    )
}

export default SignUpUser;



