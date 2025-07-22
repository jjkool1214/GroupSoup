import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import supabase from "../supabaseClient.jsx";

export function UserInfo () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const navigation = useNavigate();

    const location = useLocation();
    console.log(location)
    const groupings = location.state.selectedTags;

    console.log(groupings)

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
            return
        }
        localStorage.setItem("supabaseSession", JSON.stringify(user.data.session));
        navigation('../account')
        console.log(user)
        const userTagData = groupings.map((group) =>{
            let key = Object.keys(group)[0]

            return {"user" : user["data"]["session"]["user"]["id"], "tag" : group[key]}
        } )
        console.log(userTagData)
        const {error} = await supabase.from("user_tag_table").insert(userTagData)

        if(error){
            console.error(error)
            return;
        }

        console.log("Check the db bozo")
        navigation('../account')

    }

    return (
        <div>
            <div>
                <label htmlFor="username" >User Name</label>
                <input type={"text"} onChange={(e) => setUsername(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="password" >Password</label>
                <input type={"password"} onChange={(e) => setPassword(e.target.value)}></input>
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

