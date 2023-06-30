import MusicStyle from "../components/musicStyle.js";
import AppBar from "../components/AppBar.js";
import SecurePage from "@/components/SecurePage.js";
 
function login() {
  return (
    <>
      <SecurePage>
        <AppBar />
        <MusicStyle />
      </SecurePage>
    </>
  );
}

export default login;
