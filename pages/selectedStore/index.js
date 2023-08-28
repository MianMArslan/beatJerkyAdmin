import MyAppBar from "@/components/AppBar";
import SecurePage from "@/components/SecurePage";

function selectedStore() {
  return (
    <>
      <SecurePage>
        <MyAppBar />
      </SecurePage>
    </>
  );
}

export default selectedStore;
