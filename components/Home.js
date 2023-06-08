
import { Box, Button, ButtonGroup, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import styles from './login.module.css'
 import theme from '../themes/theme.js'
import Image from 'next/image';
import { display } from '@material-ui/system';
import { ThemeProvider } from '@emotion/react';
import SongCard from './SongCard.js'
import SearchIcon from '@mui/icons-material/Search';
import GernalModal from './GernalModal'
import { useState } from 'react';
function Home() {
  const [open, setOpen] =  useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)
  
 
  

  let songsList =[5,8,6,7,8,5,8,6,7,8,5]



    const buttonStyle = {
       
      
      
        backgroundImage: 'linear-gradient(to right, #b716d8, #d126b0)',
        color: 'white',
        fontWeight: 'bold',
    
       };
  return (
    <>
    <GernalModal open={open} close={handleClose} type={"song"}/>
    <div style={{display:"flex" ,justifyContent:'center' ,marginTop:"10vh" }}>
    <div style={{width:"600px",display:'flex',alignItems:'center' ,flexDirection:'column', justifyContent:'center' }}>    
  <TextField
      label="Search Songs"
      fullWidth
      InputProps={{
        endAdornment: (
          <Button variant="contained" style={buttonStyle} endIcon={<SearchIcon />}>
            Search
          </Button>
        ),
      }}
    />


   </div>
  </div>

 <Container >
  <div style={{display:"flex", justifyContent:"flex-end"}}>
  <Button onClick={handleOpen}   variant="contained" style={buttonStyle}  >
      Add Song
  </Button>
  </div>
 

  <Grid container  spacing={1}  >
        {songsList.map((data) => (
          <Grid mt="50px" item xs={12} sm={4} md={3} lg={3} key={data}>
            <SongCard   />
          </Grid>
        ))}
      </Grid>
      </Container>
    </>
     
  )
}

export default Home