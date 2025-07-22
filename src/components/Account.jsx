import Navigation from "./Navigation.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import useProtectedPage from "./ProtectedPage.jsx";


function Account() {
    const { passed, loading } = useProtectedPage();
    const navigate = useNavigate();

    if (loading||!passed) return null;

  return (
    <div>   
        <Navigation />
        <h1> Your Profile </h1>
    </div>
  );
}

export default Account;