import { Alert, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import styles from './login.module.css';
import theme from '../themes/theme.js';
import Image from 'next/image';
import { display } from '@material-ui/system';
import { ThemeProvider } from '@emotion/react';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { POST } from '../services/httpClient'; // Import the POST function from the httpClient

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');   
  const [password, setPassword] = useState('');
   
  const handleLogin = async () => {
    const params = { email, password,isAdmin:true };

    try {
      const response = await POST('/auth/login', params); // Send a POST request to the login API endpoint
      console.log(response); // Handle the response as per your requirements
      console.log("🚀 ~ file: login.js:24 ~ handleLogin ~ response:", response.status )

      if (response && response.status=="success") {
        console.log("🚀 ~ file: login.js:25 ~ handleLogin ~ response:", response)
        // Login successful, redirect to the home page
        router.push('/home');
      } else {
        // Login failed, handle the error
        // Display an error message or perform any other necessary actions
        console.log('Login failed');
      }
    } catch (error) {
      // Handle any network or API errors
      console.log('An error occurred:', error);
    }
  };

  const buttonStyle = {
    backgroundImage: 'linear-gradient(to right, #b716d8, #d126b0)',
    color: 'white',
    fontWeight: 'bold',
    marginTop: '10px',
  };

  return (
    <>
    {/* <Alert severity="info">This is an error alert — check it out!</Alert> */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10vh' }}>
        <div style={{ width: '400px', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
          <Image src="/logo.png" alt="My Image" width={150} height={150} />
          <TextField
            style={{ marginTop: '15px' }}
            id="filled-basic"
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            style={{ marginTop: '10px' }}
            id="filled-basic"
            label="Password"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button style={{ marginRight: '-246px', marginTop: '20px' }} variant="text">
            Forgot Password
          </Button>
          <Button style={buttonStyle} variant="contained" onClick={handleLogin} fullWidth>
            Login
          </Button>
        </div>
      </div>
    </>
  );
}

export default Login;
