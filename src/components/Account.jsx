import Navigation from "./Navigation.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";


function Account() {
    const [account, setAccount] = useState( () => {
       JSON.parse(localStorage.getItem("session"))
    });
    const navigate = useNavigate();

    function UserIsFound(){
        if(account){
            return (
                <h1>
                    {account.user.user_metadata.username}
                </h1>
            )
        } else {
            return(
                <h1>Not Found</h1>
            )
        }
    }

  return (
    <div>   
      <Navigation disabled={true} />
        <UserIsFound />
    </div>
  );
}

export default Account;