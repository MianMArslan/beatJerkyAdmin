import Home from '../components/Home.js'
 import AppBar from '../components/AppBar.js'
import SecurePage from '@/components/SecurePage.js';
import AppContextProvider from '@/context/appContext';

 function login(){
    return(<>

   
    <SecurePage>
        
    <AppBar/>
    <Home/>
    </SecurePage>
    
  
    
    </>);
}

export default login;