import Users from "../components/Users/index.js";
import AppBar from "../components/AppBar.js";
import SecurePage from "@/components/SecurePage.js";
function users() {
  return (
    <>
      <SecurePage>
        <AppBar />
        <Users />
      </SecurePage>
    </>
  );
}

export default users;
