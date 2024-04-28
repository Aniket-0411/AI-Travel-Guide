import { Link } from "react-router-dom";

import "../Styles/Navigation.css"

const Navigation = () => {
    return(
        <header className="navbar">
            <div className="nav-items">
                <div className="title">
                    <Link to="/" className="title-link">
                        <h1 className="title-text">AI Travel Guide</h1>
                    </Link>
                </div>
                <div className="links">
                    <Link to="/login" className="nav-items-link"><li className="nav-items-text">Login</li></Link>
                    <Link to="/register" className="nav-items-link"><li className="nav-items-text">Sign Up</li></Link>
                </div>
            </div>
        </header>
    );
}

export default Navigation;