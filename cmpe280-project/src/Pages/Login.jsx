import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import Cookies library

import "../Styles/Form.css";
import "../Styles/General.css";

const Login = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [userInput, setUserInput] = useState({
        username_email: "",
        password: "",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        // Check if user is already authenticated (e.g., token exists in cookies) if yes then redirect to MainPage
        const token = Cookies.get('token');
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    //Password Visibility
    const handleVisibility = () => {
        if (error !== "") {
            setError("");
        }
        setShowPassword(!showPassword);
    }

    const removeErr = () => {
        if (error !== "") {
            setError("");
        }
    }

    const userInputOnChange = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    }

    const login = async (e) => {
        // e.preventDefault();

        if (userInput.username === "" || userInput.password === ""
            || userInput.username === null || userInput.password === null) {
            setError("Username and Password cannot be empty.")
        }
        else {
            try {
                const url = "http://localhost:3001/accounts/login";
                const data = await axios.post(url, userInput);

                var date = new Date();
                date.setTime(date.getTime() + (2 * 24 * 60 * 60 * 1000));
                var expires = "expires=" + date.toUTCString();

                document.cookie = "token=" + data.data.token + ";" + expires + ";"
                document.cookie = "username=" + data.data.username + ";" + expires + ";"

                navigate("/");
                // window.location.reload();
            }
            catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setError(error.response.data.message);
                }
            }
        }
    }

    return (
        <div className='form-container'>
            <div className='form-title'>
                <h1 className="page-title-text">Login</h1>
            </div>
            <div>
                <div className='username-tf'>
                    <TextField
                        className='username-tf-setting'
                        name="username_email"
                        label="Email or Username"
                        type="text"
                        variant='outlined'
                        required
                        onClick={removeErr}
                        onChange={userInputOnChange}
                        onKeyDown={(event) => {
                            if(event.key === "Enter"){
                                login();
                            }
                        }}
                    />
                </div>
                <div className='password-tf'>
                    <TextField
                        className='password-tf-setting'
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        required
                        onClick={removeErr}
                        onChange={userInputOnChange}
                        onKeyDown={(event) => {
                            if(event.key === "Enter"){
                                login();
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={handleVisibility}
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Link className="to-link" to="/reset-password">Forget Password?</Link>
                </div>
                <div className='to-link-container'>
                    Don't have an account? <Link className='to-link' to="/register"><b>Register</b></Link>
                </div>
                {error && <div className='err-container'>{error}</div>}
                <div className='submit-btn-container'>
                    <Button className='submit-btn' onClick={login} variant='contained' color='primary' fullWidth>Login</Button>
                </div>
            </div>
        </div>
    );
}

export default Login;
