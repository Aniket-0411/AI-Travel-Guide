import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import Cookies from 'js-cookie';

import "../Styles/Form.css";
import "../Styles/General.css";

const EmailMeButton = ({ dataToSend }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const isAuthenticated = Cookies.get('token') !== undefined;

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserEmail();
    }
  }, [isAuthenticated]);

  const fetchUserEmail = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/accounts/profile`, {
        params: {
          username: Cookies.get('username')
        }
      });
      setRecipientEmail(response.data.email);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEmailSending = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/accounts/send-email`, {
        data: dataToSend,
        recipientEmail: recipientEmail
      });
      if (response.data.success) {
        setSuccess(true);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setRecipientEmail('');
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {success && <p style={{ color: 'green' }}>Email sent successfully!</p>}
      {!success && (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={isAuthenticated ? handleEmailSending : () => setOpenDialog(true)}
            disabled={isLoading || success}
            style={{ marginTop: '10px' }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Email me'}
          </Button>
          {!isAuthenticated && (
            <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
              <DialogTitle>Enter Your Email</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Your Email"
                  type="email"
                  fullWidth
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} color="primary" variant="outlined">
                  Cancel
                </Button>
                <Button onClick={handleEmailSending} color="success" variant="contained">
                  Send
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </>
      )}
    </div>
  );
};

export default EmailMeButton;
