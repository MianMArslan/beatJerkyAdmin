import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext.js";
import { useRouter } from "next/router.js";
import StoreNavigator from "../StoreNavigator/index.js";
import FeedModal from "./FeedModal.js";
import FeedCard from "./FeedCard.js";
import { GET } from "@/services/httpClient.js";
function Feed() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { storeCategoriesList, setIsLoading, setSnackbarState } =
    useContext(AppContext);
  const [list, setList] = useState(null);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await GET(`/feed/storeFeed?storeId=${router.query.storeId}`);
      console.log("🚀 ~ file: index.js:31 ~ fetchData ~ res:", res);

      setList(res.data);
      console.log("Fetched songs:", res);
    } catch (error) {
      console.error("Failed to fetch songs:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Box mt={1} p={5}>
        <StoreNavigator />
        <FeedModal />
        <Grid container>
          {list?.length ? (
            list.map((element) => (
              <Grid item sm={4}>
                <FeedCard
                  description={element.description}
                  imageUrl={element.imageUrl}
                  id={element.id}
                />
              </Grid>
            ))
          ) : (
            <h4>No Record Found</h4>
          )}
        </Grid>
      </Box>
    </>
  );
}

export default Feed;
