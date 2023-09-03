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
import SelectedStore from "../SelectedStore/index.js";
import SelectedStoreAvatar from "./SelectedStoreAvatar.js";
import { GET, POST } from "@/services/httpClient.js";

function ChatContainer() {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState([]);
  const { selectedUser, setSelectedUser } = useContext(AppContext);
  const router = useRouter();
  async function getAllChat() {
    if (selectedUser == null) return;
    const response = await GET(`/adminChat/messages?userId=${selectedUser}`);
    setChat(response.data);
    console.log(
      "🚀 ~ file: ChatContainer.js:29 ~ getAllChat ~ response:",
      response
    );
  }
  async function handleSend() {
    if (!message.length) return;
    const newMessage = {
      senderId: userData.userId,
      receiverId: selectedUser,
      message,
      storeId: router.query.storeId,
    };

    const response = await POST(newMessage);
    if (response) {
      setChat([...chat, newMessage]);
      setMessage("");
    }
  }

  useEffect(() => {
    getAllChat();
  }, [selectedUser]);
  const styles = {
    root: {
      "& .MuiInput-underline:before": {
        borderBottom: "none", // Remove the default underline
      },
      "& .MuiInput-underline:after": {
        borderBottom: "none", // Remove the active line
      },
    },
  };
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
          width="28%"
          height="100%"
          borderRight={1}
          p={2}
          display="flex"
          flexDirection="column"
        >
          <SelectedStoreAvatar />

          <Users />
        </Box>

        {/* Right Side (Chat) */}
        {selectedUser ? (
          <Box p={2} flex={1} display="flex" flexDirection="column">
            {/* Chat Content */}
            <Box
              display="flex"
              flexDirection="column"
              style={{
                paddingRight: "35px",
                overflow: "hidden", // Hide horizontal overflow
                overflowY: "auto ",
                flexGrow: 1, // Allow the box to grow when chat bubbles overflow
                marginRight: -16, // Compensate for scrollbar width
              }}
            >
              {chat.map((element) => (
                <Box
                  display={"flex"}
                  justifyContent={
                    element.senderId == userData?.userId
                      ? "flex-start"
                      : "flex-end"
                  }
                >
                  <ChatBubble
                    message={element.message}
                    color={
                      element.senderId == userData?.userId
                        ? " #b716d8"
                        : " #d126b0"
                    }
                  />
                </Box>
              ))}

              {/* <ChatBubble message="Hello Hamza" color={" #d126b0"} /> */}

              {/* Add more ChatBubble components as needed */}
            </Box>

            <Box display="flex" alignItems="center" mt={2}>
              {/* <TextField
              hiddenLabel
              fullWidth
              id="filled-hidden-label-small"
              defaultValue=""
              variant="filled"
              size="small"
              placeholder="Type your message..."
              style={{ borderRadius: "18px", border: "none  	" }}
            /> */}
              <input
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                defaultValue={message}
                type="text"
                style={{
                  width: "100%",
                  borderRadius: "18px",
                  height: "35px",
                  paddingLeft: "10px",
                  backgroundColor: "transparent",
                  borderColor: "#b716d8",
                }}
              />
              <IconButton color="primary" onClick={handleSend}>
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Box ml={2} mt={2}>
            {" "}
            <Typography variant="h5" color={"GrayText"}>
              Please Pick a Chat to Begin
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ChatContainer;
