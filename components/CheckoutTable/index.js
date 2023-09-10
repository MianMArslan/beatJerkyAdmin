import { Box, Typography } from "@mui/material";
import CheckoutTable from "./CheckoutTable.js";
function Checkout() {
  return (
    <>
      <Box display={"flex"} mt={3} justifyContent={"center"}>
        <Typography variant="h5">All orders details</Typography>
      </Box>
      <CheckoutTable />
    </>
  );
}

export default Checkout;
