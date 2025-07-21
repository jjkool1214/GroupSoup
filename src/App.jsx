import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import './App.css';
import {UserInfo} from "./components/UserInfo.jsx";
import {Questionnaire} from "./components/Questionnaire.jsx";

const Home = lazy(() => import('./components/Home'));
const Account = lazy(() => import('./components/Account'));
const Groups = lazy(() => import('./components/Groups'));
const Landing = lazy(() => import('./components/Landing'));
const Login = lazy(() => import('./components/Login'));
const SignUp = lazy(() => import('./components/SignUp'));
const SetUpOne = lazy(() => import('./components/SetUpOne'));
const SetUpTwo = lazy(() => import('./components/SetUpTwo'));


function App() {
    return (
        <Router>

            <ScrollToTop />

            <div className="App">
                <main>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<Landing />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/groups" element={<Groups />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="signup/userInput" element={<UserInfo />} />
                            <Route path="/signup/stepone" element={<SetUpOne />} />
                            <Route path="/signup/steptwo" element={<SetUpTwo />} />
                            <Route path="/signup/Questionnaire" element={<Questionnaire />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
}

export default App;

