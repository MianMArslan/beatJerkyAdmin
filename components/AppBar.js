import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
// import { destroyCookie } from 'nookies';
 
import { AppContext } from "../context/appContext";
import { useContext } from 'react';




function MyAppBar() {

 
  const { isLoading, setIsLoading } = useContext(AppContext);

  
  const router = useRouter();
  const handleLogout = () => {
    destroyCookie(null, 'accessToken'); // Clear the accessToken cookie
    router.push('/login'); // Redirect to the login page
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          
        </div>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <Button onClick={()=>{router.push('/home')}}  color="inherit">Home</Button>
          </Grid>
          <Grid item>
            <Button onClick={()=>{router.push('/users')}} color="inherit">Users</Button>
          </Grid>
          <Grid item>
            <Button onClick={()=>{router.push('/category')}} color="inherit">Category</Button>
          </Grid>
          <Grid item>
            <Button onClick={()=>{router.push('/changePassword')}} color="inherit">Settings</Button>
          </Grid>
        </Grid>
        
        <Button onClick={handleLogout} color="inherit">LogOut</Button>
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
