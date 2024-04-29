import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from "axios";

import "../Styles/Form.css";
import "../Styles/General.css";

const Register = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [userInput, setUserInput] = useState({
        email: "",
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleVisibility = () => {
        if(error !== ""){
            setError("");
        }
        setShowPassword(!showPassword);
    }

    const handleConfirm = () => {
        if(error !== ""){
            setError("");
        }
        setShowConfirm(!showConfirm); 
    }

    const removeErr = () => {
        if(error !== ""){
            setError("");
        }
    }

    const userInputOnChange = (e) => {
        setUserInput({...userInput, [e.target.name]: e.target.value});
    }

    const register = async (e) => {
        e.preventDefault();
        console.log(document.getElementById("confirm").value);

        if(userInput.username === "" || userInput.password === ""
            || userInput.email === "" || document.getElementById("confirm").value === ""){
            setError("Textfields cannot be empty.");
        }
        else if(userInput.password !== document.getElementById("confirm").value){
            setError("Passwords not match.");
            setUserInput({...userInput, password: ""});
            document.getElementById("password").value = "";
            document.getElementById("confirm").value = "";
        }
        else{
            try {
                const url = "http://localhost:3001/accounts/signup";
                const { data: res } = await axios.post(url, userInput);
                localStorage.setItem("data", JSON.stringify(res.data));
                navigate("/");
                window.location.reload();
            }
            catch (error){
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

    return(
        <div className='form-container'>
            <div className='form-title'>
                <h1 className="page-title-text">Register</h1>
            </div>
            <div>
                <div className='username-tf'>
                    <TextField
                        className='username-tf-setting'
                        name="email"
                        label="Email"
                        type="text"
                        variant='outlined'
                        required
                        onClick={removeErr}
                        onChange={userInputOnChange}
                    />
                </div>
                <div className='username-tf'>
                    <TextField
                        className='username-tf-setting'
                        name="username"
                        label="Username"
                        type="text"
                        variant='outlined'
                        required
                        onClick={removeErr}
                        onChange={userInputOnChange}
                    />
                </div>
                <div className='password-tf'>
                    <TextField
                        className='password-tf-setting'
                        name="password"
                        label="Password"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        required
                        onClick={removeErr}
                        onChange={userInputOnChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={handleVisibility}
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                <div className='password-tf'>
                    <TextField
                        className='password-tf-setting'
                        label="Confirm Password"
                        id="confirm"
                        type={showConfirm ? "text" : "password"}
                        variant="outlined"
                        required
                        onClick={removeErr}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={handleConfirm}
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        {showConfirm ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                <div className='to-link-container'>
                    <Link className='to-link' to="/login">Already have an account? Login.</Link>
                </div>
                {error && <div className='err-container'>{error}</div>}
                <div className='submit-btn-container'>
                    <Button className='submit-btn' onClick={register} variant='contained' color='primary' fullWidth>Register</Button>
                </div>
            </div>
        </div>
    );
}

export default Register;