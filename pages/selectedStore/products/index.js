import MyAppBar from "@/components/AppBar";
import SecurePage from "@/components/SecurePage";
import SelectedStore from "@/components/SelectedStore";

function products() {
  return (
    <>
      <SecurePage>
        <MyAppBar />
        <SelectedStore />
      </SecurePage>
    </>
  );
}

export default products;
