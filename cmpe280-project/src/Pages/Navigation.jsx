import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

import "../Styles/Navigation.css"

const Navigation = () => {
    const navigate = useNavigate();

    const signout = () => {
        const resp = window.confirm("Do you want to logout?")
        if (resp) {
            Cookies.remove('token');
            Cookies.remove('username');
            navigate("/");
            window.location.reload();
        }
    }

    const isAuthenticated = Cookies.get('token');
    const username = Cookies.get('username');

    return(
        <header className="navbar">
            <div className="nav-items">
                <div className="title">
                    <Link to="/" className="title-link">
                        <h1 className="title-text">AI Travel Guide</h1>
                    </Link>
                </div>
                {
                    isAuthenticated ? 
                    <React.Fragment>
                        <div className="links">
                            <div className="nav-user"><li className="nav-user-text">{username}</li></div>
                            <div className="nav-user" onClick={signout}><li className="nav-user-text">Logout</li></div>
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div className="links">
                            <Link to="/login" className="nav-items-link"><li className="nav-items-text">Login</li></Link>
                            <Link to="/register" className="nav-items-link"><li className="nav-items-text">Sign Up</li></Link>
                        </div>
                    </React.Fragment>
                }
            </div>
        </header>
    );
}

export default Navigation;