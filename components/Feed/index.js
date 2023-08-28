import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext.js";
import { useRouter } from "next/router.js";
import StoreNavigator from "../StoreNavigator/index.js";

function Feed() {
  const router = useRouter();
  return (
    <>
      <Box mt={1} p={5}>
        <StoreNavigator />
        <h1>Feed Section</h1>
      </Box>
    </>
  );
}

export default Feed;
