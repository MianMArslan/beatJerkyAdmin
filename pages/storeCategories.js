import StoreCategory from "../components/StoreCategory";
import AppBar from "../components/AppBar.js";
import SecurePage from "@/components/SecurePage.js";

function StoreCategories() {
  return (
    <>
      <SecurePage>
        <AppBar />
        <StoreCategory />
      </SecurePage>
    </>
  );
}

export default StoreCategories;
