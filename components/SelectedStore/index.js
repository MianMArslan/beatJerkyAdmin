import { Box, Button, ButtonGroup, Grid } from "@mui/material";
import { useEffect, useInsertionEffect, useState } from "react";
import ProductModal from "./ProductModal";
import ProductCard from "./ProductCard";
import { useRouter } from "next/router";
import { GET } from "@/services/httpClient";
import StoreNavigator from "../StoreNavigator";
export default function SelectedStore() {
  const router = useRouter();
  console.log(
    "🚀 ~ file: index.js:9 ~ SelectedStore ~ router:",
    router.pathname
  );
  const buttonStyle = {
    backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
    color: "white",
    fontWeight: "bold",
  };
  const [list, setList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await GET(`/products/${router.query.storeId}`);
      setList(response?.products);
      console.log("Fetched songs:", response);
    } catch (error) {
      console.error("Failed to fetch songs:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [router.query.storeId]);
  return (
    <Box mt={1} p={5}>
      <StoreNavigator />
      <ProductModal />
      <Grid container>
        {" "}
        {list?.map((element) => (
          <Grid item sm={4}>
            <ProductCard details={element} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
