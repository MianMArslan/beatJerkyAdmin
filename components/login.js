import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import styles from './login.module.css'
 import theme from '../themes/theme.js'
import Image from 'next/image';
import { display } from '@material-ui/system';
import { ThemeProvider } from '@emotion/react';
import React from 'react';
 
 
function login() {
    const buttonStyle = {
        backgroundImage: 'linear-gradient(to right, #b716d8, #d126b0)',
        color: 'white',
        fontWeight: 'bold',
        marginTop:"10px"
       };
  return (
    <>
    

    <div style={{display:"flex" ,justifyContent:'center' ,marginTop:"10vh" }}>
        
       <div style={{width:"400px",display:'flex',alignItems:'center' ,flexDirection:'column', justifyContent:'center' }}>    
    <Image src="/logo.png" alt="My Image" width={150} height={150} />
    <TextField style={{marginTop:"15px"}} id="filled-basic" label="Email" fullWidth />
    <TextField style={{marginTop:"10px"}}id="filled-basic" label="Password"  fullWidth/>
    <Button style={{marginRight:"  -246px",marginTop:"20px"}}  variant="text"  >Forgot Password</Button>
    <Button style={buttonStyle} variant="contained" fullWidth>Login</Button>
    
    </div>

 
    </div>
      
  
    </>
     
  )
}

export default login