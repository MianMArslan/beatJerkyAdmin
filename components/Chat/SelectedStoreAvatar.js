import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Typography,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext.js";
import { useRouter } from "next/router.js";
import StoreNavigator from "../StoreNavigator/index.js";
import ChatContainer from "./ChatContainer.js";

function SelectedStoreAvatar() {
  const router = useRouter();
  return (
    <>
      <Box
        borderBottom={1}
        width="100%"
        height="20%"
        sx={{ borderColor: " #b716d8" }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        pb={2}
        mt={1}
      >
        <Avatar
          alt={router.query.storeName}
          src={`${
            process.env.NEXT_PUBLIC_BASE_URL
          }${router.query.storeImage?.replace("public", "")}`}
          sx={{ width: 56, height: 56 }}
        />
        <Typography>{router.query.storeName}</Typography>
      </Box>
    </>
  );
}

export default SelectedStoreAvatar;
