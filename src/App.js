import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./Styles/App.css";
import "./Styles/Button.css";
import "./Styles/Device.css";
import "./Styles/Section.css";

import PageNotFound from './Pages/404/404';
import Landing from './Pages/Landing/Index';
// import Loading from './Pages/Loading/Index';

import Callback from "./Pages/OAuth/Callback"; // 
import Logout from "./Pages/OAuth/Logout"; // 
import LogoutCallback from "./Pages/OAuth/LogoutCallback"; // 



function App() {


    return (
        <>
            <BrowserRouter>
                <Routes>

                    {/* <Route path="/" element={<Navigate to="/loading" />} />
                    <Route element={<Loading />} path="/loading" /> */}

                    {/* This is the new combo landing page that lets the user build their own dashboard and display it as the landing page */}
                    <Route element={<Landing />} path="/" />


                    <Route element={<Callback />} path="/callback" />
                    <Route element={<Logout />} path="/logout" />
                    <Route element={<LogoutCallback />} path="/logout-callback" />

                    <Route
                        path="*"
                        element={<PageNotFound />}
                    />


                </Routes>
            </BrowserRouter>

        </>
    );
}

export default App;