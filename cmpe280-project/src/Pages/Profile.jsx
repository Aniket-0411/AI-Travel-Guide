import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

import "../Styles/Profile.css";
import "../Styles/General.css";
import "../Styles/Form.css";

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: Cookies.get("username"),
        email: "",
        password: "",
    });
    const [changePassword, setChangePassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (!userData.username) {
            return navigate("/");
        }

        const fetchItem = async (username) => {
            const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/accounts/profile`, {
                params: { username }
            });
            setUserData(prev => ({
                ...prev,
                email: result.data.email,
            }));
        };

        fetchItem(userData.username);
    }, [userData.username, navigate]);

    const setChange = () => {
        if(error !== ""){
            setError("");
        }
        if(success !== ""){
            setSuccess("");
        }
        setShowPassword(false);
        setShowRePassword(false);
        setChangePassword(!changePassword);
    }

    const handlieReVisibility = () => {
        if(error !== ""){
            setError("");
        }
        setShowRePassword(!showRePassword);
    }

    const setPassword = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value});
    }

    const handleVisibility = () => {
        if(error !== ""){
            setError("");
        }
        setShowPassword(!showPassword);
    }

    const resetPassword = async () => {
        const rePassword = document.getElementById("repassword").value;
        if(rePassword === "" || userData.password === ""){
            return setError("Passwords cannot be empty!");
        } 
        else if (rePassword !== userData.password) {
            setUserData({...userData, password: ""});
            document.getElementById("repassword").value = "";
            document.getElementById("password").value = "";
            return setError("Passwords not match!");
        }
        else {
            try {
                const url = `${process.env.REACT_APP_SERVER_URL}/accounts/reset-password`;
                const data = await axios.post(url, userData);
                setChange();
                setSuccess(data.data.message);
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

    return (
        <div className="profile-div">
            <h1 className="times-new-roman profile-header">
                Profile
            </h1>
            <div className="profile-info-div">
                <p className="times-new-roman profile-info"><b>Username:</b> {userData.username}</p>
            </div>
            <div className="profile-info-div">
                <p className="times-new-roman profile-info"><b>Email:</b> {userData.email}</p>
            </div>
            <div className="profile-info-div">
                {
                    changePassword ? 
                    <React.Fragment>
                        <div>
                            <div className="profile-text-field">
                                <TextField
                                    name="password"
                                    label="Password"
                                    id="password"
                                    onChange={setPassword}
                                    type={showPassword ? "text" : "password"}
                                    fullWidth
                                    onKeyDown={(event) => {
                                        if(event.key === "Enter"){
                                            resetPassword();
                                        }
                                    }}
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
                            <div className="profile-text-field lower-tf">
                                <TextField
                                    name="repassword"
                                    label="Comfirmed Password"
                                    id="repassword"
                                    type={showRePassword ? "text" : "password"}
                                    fullWidth
                                    onKeyDown={(event) => {
                                        if(event.key === "Enter"){
                                            resetPassword();
                                        }
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    onClick={handlieReVisibility}
                                                    onMouseDown={(e) => e.preventDefault()}
                                                >
                                                    {showRePassword ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                /> 
                            </div>
                            {error && <div className='err-container profile-reset-info'>{error}</div>}
                            <div className="profile-password-btns">
                                <Button onClick={resetPassword} variant="contained" color="primary">Save</Button>
                                <Button onClick={setChange} variant="contained" color="error">Cancel</Button>
                            </div>
                        </div>
                    </React.Fragment> :
                    <React.Fragment>
                        <Button onClick={setChange} variant="contained">Change Password?</Button>
                        {success && <div className="succ-container profile-reset-info">{success}</div>}
                    </React.Fragment>
                }
            </div>
        </div>
    );
};

export default Profile;
