import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SetNewPassword = () => {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/resetpassword/${resetToken}`, { newPassword });
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='form-container'>
      <div className='form-title'>
        <h1 className="page-title-text">Reset Password</h1>
      </div>
      <div>
        <div className='password-tf'>
          <TextField
            className='password-tf-setting'
            label="New Password"
            type={showPassword ? "text" : "password"}
            variant='outlined'
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={handleVisibility}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
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
            type={showPassword ? "text" : "password"}
            variant='outlined'
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={handleVisibility}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>
        {message && <div className='err-container'>{message}</div>}
        <div className='submit-btn-container'>
          <Button className='submit-btn' onClick={handleResetPassword} variant='contained' color='primary' fullWidth>Reset Password</Button>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
