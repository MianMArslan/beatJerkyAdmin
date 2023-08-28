import Chat from "../../../components/Chat";
import AppBar from "../../../components/AppBar.js";
import SecurePage from "@/components/SecurePage";
function selectedStore() {
  return (
    <>
      <SecurePage>
        <AppBar />
        <Chat />
      </SecurePage>
    </>
  );
}

export default selectedStore;
