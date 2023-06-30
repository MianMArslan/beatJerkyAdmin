 import MusicStyle from "@/components/musicStyleCategory/MusicStyle.js"
 import AppBar from "../components/AppBar.js";
import SecurePage from "@/components/SecurePage.js";

function musicStyleCategory() {
  return (
    <>
      <SecurePage>
        <AppBar />
        <MusicStyle />
      </SecurePage>
    </>
  );
}

export default musicStyleCategory;
