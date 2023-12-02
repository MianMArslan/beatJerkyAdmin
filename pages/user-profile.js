import UserProfile from "../components/UserProfile";
import AppBar from "../components/AppBar.js";
import SecurePage from "@/components/SecurePage.js";
function users() {
  return (
    <>
      <SecurePage>
        <AppBar />
        <UserProfile />
      </SecurePage>
    </>
  );
}

export default users;
