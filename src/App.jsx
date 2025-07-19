import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

const Home = lazy(() => import('./components/Home.jsx'));
const Account = lazy(() => import('./components/Account.jsx'));
const Groups = lazy(() => import('./components/Groups.jsx'));
const Landing = lazy(() => import('./components/Landing.jsx'));
const Login = lazy(() => import('./components/Login.jsx'));
const SignUp = lazy(() => import('./components/SignUp.jsx'));



function App() {
    return (
        <Router>
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
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
}

export default App;

