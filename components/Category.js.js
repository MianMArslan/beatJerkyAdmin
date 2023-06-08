
import { Box, Button, ButtonGroup, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
 
import SongCard from './SongCard.js'
import SearchIcon from '@mui/icons-material/Search';
 
import { useState } from 'react';
import CategoryTable from './CategoryTable.js';
import GernalModal from './GernalModal'
function Category() {
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
    
  
    <GernalModal open={open} close={handleClose} type={"category"}/>

 <Container >
  <div style={{display:"flex", justifyContent:"center" ,marginTop:"5vh"}}>
  <Typography variant='h5'>Songs Categories</Typography>
  </div>
  
  <div style={{display:"flex", justifyContent:"flex-end" ,marginTop:"5vh"}}>
  <Button onClick={()=>setOpen(true)}   variant="contained" style={buttonStyle}  >
      Add Category
  </Button>
  </div>
 
<CategoryTable/>
 
      </Container>
    </>
     
  )
}

export default Category