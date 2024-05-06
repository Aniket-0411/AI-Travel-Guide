import React, { useState } from 'react';
import axios from 'axios';
import { Button, CircularProgress } from '@mui/material';

const EmailMeButton = ({ dataToSend, recipientEmail }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleEmailSending = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/accounts/send-email', {
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

  return (
    <div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {success && <p style={{ color: 'green' }}>Email sent successfully!</p>}
      {!success && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleEmailSending}
          disabled={isLoading || success}
          style={{ marginTop: '10px' }} // Adjust margin if needed
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Email me'}
        </Button>
      )}
    </div>
  );
};

export default EmailMeButton;
