import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import './App.css';
import {UserInfo} from "./components/UserInfo.jsx";
import { LoadScript } from '@react-google-maps/api';


const Home = lazy(() => import('./components/Home'));
const Account = lazy(() => import('./components/Account'));
const Groups = lazy(() => import('./components/Groups'));
const Landing = lazy(() => import('./components/Landing'));
const Login = lazy(() => import('./components/Login'));
const SignUp = lazy(() => import('./components/SignUpUser.jsx'));
const SetUpOne = lazy(() => import('./components/SetUpOne'));
const SetUpTwo = lazy(() => import('./components/SetUpTwo'));
const Questionnaire = lazy(() => import('./components/Questionnaire'));
const SignUpBusiness = lazy( () => import("./components/UserInfoBusiness.jsx"));
const Descriptors = lazy(() => import('./components/Descriptors'));
const BusinessDashboard = lazy(() => import('./components/BusinessDashboard.jsx'));


function App() {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    return (
        <Router>

            <ScrollToTop />

            <div className="App">
                <LoadScript googleMapsApiKey={apiKey}/>

                <main>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<Landing />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/groups" element={<Groups />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="signup/userInfo" element={<UserInfo />} />
                            <Route path="/signup/stepone" element={<SetUpOne />} />
                            <Route path="/signup/steptwo" element={<SetUpTwo />} />
                            <Route path="/signup/Questionnaire" element={<Questionnaire />} />
                            <Route path="/businessSignup" element={<SignUpBusiness />} />
                            <Route path="/businessSignup/Descriptors" element={<Descriptors />} />
                            <Route path="/businessDashboard" element={<BusinessDashboard />} />

                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
}

export default App;

