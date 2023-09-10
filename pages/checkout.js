import AppBar from "../components/AppBar.js";
import SecurePage from "@/components/SecurePage.js";
import CheckoutTable from "@/components/CheckoutTable";
function checkout() {
  return (
    <>
      <SecurePage>
        <AppBar />
        <CheckoutTable />
      </SecurePage>
    </>
  );
}

export default checkout;
