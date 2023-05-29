import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
 
import Image from 'next/image';
 
import React from 'react';
import { useRouter } from 'next/router';
 
 
function ChangePassword() {
  const router = useRouter();
    const buttonStyle = {
        backgroundImage: 'linear-gradient(to right, #b716d8, #d126b0)',
        color: 'white',
        fontWeight: 'bold',
        marginTop:"20px"
       };
  return (
    <>
    

    <div style={{display:"flex" ,justifyContent:'center' ,marginTop:"10vh" }}>
        
       <div style={{width:"400px",display:'flex',alignItems:'center' ,flexDirection:'column', justifyContent:'center' }}>  
       <Typography variant='h4'>
        
        Change Your Password
        </Typography>  
     <TextField style={{marginTop:"60px"}} id="filled-basic" label="Current password" fullWidth />
    <TextField style={{marginTop:"10px"}}id="filled-basic" label="New Password"  fullWidth/>
     <Button style={buttonStyle} variant="contained"  fullWidth>Change Password</Button>
    
    </div>

 
    </div>
      
  
    </>
     
  )
}

export default ChangePassword