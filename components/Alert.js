import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

const AppAlert = (props) => {
  console.log("🚀 ~ file: Alert.js:8 ~ AppAlert ~ severity, title, message:",   props.alert );
  const { severity, title, message,}=props.alert;
  return (
    <Alert
      style={{ marginTop: '50px', backgroundColor: severity === 'success' ? 'green' : 'red' }}
      severity={severity}
    >
      <AlertTitle>
        <Typography>{title}: {message}</Typography>
      </AlertTitle>
      
    </Alert>
  );
};

export default AppAlert;
