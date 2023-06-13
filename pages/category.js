import Category from "../components/category/Category.js.js";
import AppBar from "../components/AppBar.js";
import SecurePage from "@/components/SecurePage.js";

function login() {
  return (
    <>
      <SecurePage>
        <AppBar />
        <Category />
      </SecurePage>
    </>
  );
}

export default login;
