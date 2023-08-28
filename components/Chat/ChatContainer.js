import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext.js";
import { useRouter } from "next/router.js";
import StoreNavigator from "../StoreNavigator/index.js";
import SendIcon from "@mui/icons-material/Send";
import ChatBubble from "./ChatBubble.js";
import Users from "./Users.js";

function ChatContainer() {
  const router = useRouter();

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Box
        sx={{ borderColor: " #b716d8" }}
        display="flex"
        mt={1}
        p={0}
        borderRadius={2}
        width="70%"
        height="65vh"
        border={1}
        overflow="hidden" // Hide scrollbars by default
      >
        {/* Left Side (Users) */}
        <Box
          sx={{ borderColor: " #b716d8" }}
          width="25%"
          height="100%"
          borderRight={1}
          p={2}
          display="flex"
          flexDirection="column"
        >
          <Users />
        </Box>

        {/* Right Side (Chat) */}
        <Box p={2} flex={1} display="flex" flexDirection="column">
          {/* Chat Content */}
          <Box
            display="flex"
            flexDirection="column"
            style={{
              overflowY: "hidden", // Enable vertical scrolling
              flexGrow: 1, // Allow the box to grow when chat bubbles overflow
              marginRight: -16, // Compensate for scrollbar width
              scrollY: "",
            }}
          >
            <ChatBubble message="Hello Hamza" color={" #b716d8"} />
            <ChatBubble message="Hello Hamza" color={" #d126b0"} />
            <ChatBubble message="Hello Hamza" color={" #b716d8"} />
            {/* Add more ChatBubble components as needed */}
          </Box>

          <Box display="flex" alignItems="center" mt={2}>
            <TextField
              hiddenLabel
              fullWidth
              id="filled-hidden-label-small"
              defaultValue=""
              variant="filled"
              size="small"
              placeholder="Type your message..."
              style={{ borderRadius: "18px" }}
            />
            <IconButton color="primary">
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ChatContainer;
