import Feed from "../../../components/Feed";
import AppBar from "../../../components/AppBar.js";
import SecurePage from "@/components/SecurePage";
function selectedStore() {
  return (
    <>
      <SecurePage>
        <AppBar />
        <Feed />
      </SecurePage>
    </>
  );
}

export default selectedStore;
