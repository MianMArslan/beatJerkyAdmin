import Stores from "../components/Stores";
import AppBar from "../components/AppBar.js";
import SecurePage from "@/components/SecurePage";
function changePassword() {
  return (
    <>
      <SecurePage>
        <AppBar />
        <Stores />
      </SecurePage>
    </>
  );
}

export default changePassword;
