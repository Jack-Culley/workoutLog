import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from './components/Home';
import PasswordUpdate from './components/PasswordUpdate';
import Login from "./components/Login";
import { useSelector } from 'react-redux';


//isAuthenticated is false when we press change password but true when we go to login
function PrivateRoute1({isAuthenticated, children}) {
    return (
        isAuthenticated ? children : <Navigate to={{
                pathname: "/login/",
            }}
        />
      );
}

function PrivateRoute2({isAuthenticated, children}) {
    return (
        !isAuthenticated ? children : <Navigate to={{
                pathname: "/",
            }}
        />
      );
}

function PrivateRoute3({isAuthenticated, children}) {
    return (
        isAuthenticated ? children : <Navigate to={{
                pathname: "/",
            }}
        />
      );
}

function Urls() {
    const isAuthenticated = useSelector((state) => state.auth.token !== null && typeof state.auth.token !== 'undefined')

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login/" element={
                        <PrivateRoute2 isAuthenticated={isAuthenticated}>
                            <Login />
                        </PrivateRoute2>
                    }/>
                    <Route exact path="/" element={
                        <PrivateRoute1 isAuthenticated={isAuthenticated}>
                            <Home />
                        </PrivateRoute1>
                    }/>
                    <Route exact path="/update_password/" element={
                        <PrivateRoute3 isAuthenticated={isAuthenticated}>
                            <PasswordUpdate />
                        </PrivateRoute3>
                    }/>
                    <Route path="*" element={
                        <Navigate to={{
                            pathname: "/login/",
                        }}/>
                    }/>
                </Routes>
            </BrowserRouter>
        </div>
    )
};

export default Urls;