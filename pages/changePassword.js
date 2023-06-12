import ChangePassword from '../components/ChangePassword'
import AppBar from '../components/AppBar.js'
import SecurePage from '@/components/SecurePage';
 function changePassword(){
    return(<>
    <SecurePage>
    <AppBar/>
    <ChangePassword/>
    </SecurePage>

    
    </>);
}

export default changePassword;