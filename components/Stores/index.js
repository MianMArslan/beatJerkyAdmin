import { Box, Button, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import StoreModal from "./StoreModal";
import StoreCard from "./StoreCard";
import { AppContext } from "@/context/appContext";
import { GET } from "../../services/httpClient";
import { useRouter } from "next/router";
export default function Stores() {
  const router = useRouter();

  const [list, setList] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isImageUpdated, setIsImageUpdated] = useState(false);

  const { storeCategoriesList, setStoreCategoriesList } =
    useContext(AppContext);
  const buttonStyle = {
    backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
    color: "white",
    fontWeight: "bold",
  };
  const fetchData = async () => {
    try {
      const responseOfCategory = await GET("/storeCategory");

      setStoreCategoriesList(responseOfCategory.data);

      const searchQuery = router.query.search || "";

      const endpoint = `/stores?search=${encodeURIComponent(searchQuery)}`;

      const response = await GET(endpoint);
      console.log("🚀 ~ file: index.js:27 ~ fetchData ~ response:", response);
      setList(response.stores);
      console.log("Fetched songs:", response.stores);
    } catch (error) {
      console.log("🚀 ~ file: index.js:31 ~ fetchData ~ error:", error);
      console.error("Failed to fetch songs:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [isUpdated, isImageUpdated]);
  return (
    <Box mt={5} p={5}>
      <StoreModal isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
      <Grid container>
        {list?.length ? (
          list.map((element) => (
            <Grid
              item
              sm={12}
              md={6}
              lg={4}
              display={"flex"}
              justifyContent={"center"}
            >
              <StoreCard
                isImageUpdated={isImageUpdated}
                setIsImageUpdated={setIsImageUpdated}
                isUpdated={isUpdated}
                setIsUpdated={setIsUpdated}
                storeName={element.storeName}
                storeDescription={element.storeDescription}
                storeImage={element.storeImage}
                id={element.id}
              />
            </Grid>
          ))
        ) : (
          <h4>No Record Found</h4>
        )}
      </Grid>
    </Box>
  );
}
