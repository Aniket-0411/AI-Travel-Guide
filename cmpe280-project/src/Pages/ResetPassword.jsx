import React, { useState } from 'react';
import axios from 'axios';
import { Button, CircularProgress, TextField } from '@mui/material'; // Import TextField from MUI
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    setIsLoading(true); // Start loading animation
    try {
      const response = await axios.post('http://localhost:3001/accounts/reset-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  return (
    <div className='form-container'>
      <div className='form-title'>
        <h1 className="page-title-text">Forgot Password</h1>
      </div>
      <div>
        <div className='username-tf'>
          <TextField
            className='username-tf-setting'
            label="Email"
            type="email"
            variant='outlined'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='to-link-container'>
            Remembered your password? <Link className="to-link" to="/login"><b>Login</b></Link>
        </div>
        {message && <div className='err-container'>{message}</div>}
        <div className='submit-btn-container'>
          <Button className='submit-btn' onClick={handleResetPassword} variant='contained' color='primary' fullWidth>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
