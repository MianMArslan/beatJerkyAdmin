import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext.js";
import { useRouter } from "next/router.js";
import StoreNavigator from "../StoreNavigator/index.js";
import ChatContainer from "./ChatContainer.js";

function Chat() {
  const router = useRouter();
  return (
    <>
      <Box mt={1} p={5}>
        <Box></Box>
        <StoreNavigator />
        <ChatContainer />
      </Box>
    </>
  );
}

export default Chat;
