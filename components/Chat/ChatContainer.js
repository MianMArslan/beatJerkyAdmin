import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";

import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/appContext.js";
import { useRouter } from "next/router.js";
import StoreNavigator from "../StoreNavigator/index.js";
import SendIcon from "@mui/icons-material/Send";
import ChatBubble from "./ChatBubble.js";
import Users from "./Users.js";
import SelectedStore from "../SelectedStore/index.js";
import SelectedStoreAvatar from "./SelectedStoreAvatar.js";
import { GET, POST } from "@/services/httpClient.js";
import ChatSkeleton from "./ChatSkeliton.js";

function ChatContainer() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const chatContainerRef = useRef(null);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedUser, setSelectedUser } = useContext(AppContext);
  const router = useRouter();
  async function getAllChat() {
    if (!selectedUser) return;
    const response = await GET(
      `/adminChat/fetchChatWithStore?userId=${selectedUser}&storeId=${router.query.storeId}`
    );
    setChat(response.data);
    setIsLoading(false);
    scrollToBottom();
  }

  async function handleSend() {
    console.log(
      "🚀 ~ file: ChatContainer.js:42 ~ handleSend ~ selectedUser:",
      selectedUser,
      message.length
    );

    if (!message.length || !selectedUser) return;
    console.log(
      "🚀 ~ file: ChatContainer.js:48 ~ handleSend ~ !message.length || !selectedUser:",
      !message.length || !selectedUser
    );

    const newMessage = {
      senderId: userData.userId,
      receiverId: selectedUser,
      message,
      storeId: router.query.storeId,
    };

    const response = await POST("/adminChat", newMessage);
    console.log(
      "🚀 ~ file: ChatContainer.js:57 ~ handleSend ~ response:",
      response
    );
    if (response) {
      setChat([...chat, newMessage]);
      scrollToBottom();
      setMessage("");
    }
  }

  useEffect(() => {
    let chatFetchInterval;

    if (selectedUser) {
      getAllChat();

      chatFetchInterval = setInterval(() => {
        getAllChat();
      }, 2000);

      return () => {
        setSelectedUser(null);
        clearInterval(chatFetchInterval);
      };
    }
  }, [selectedUser]);
  const styles = {
    root: {
      "& .MuiInput-underline:before": {
        borderBottom: "none",
      },
      "& .MuiInput-underline:after": {
        borderBottom: "none",
      },
    },
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Scroll to the bottom whenever chat messages change
    scrollToBottom();
  }, [chat]);
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
        overflow="hidden"
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
            {isLoading ? (
              <LinearProgress color="secondary" />
            ) : (
              <>
                {" "}
                <Box
                  display="flex"
                  flexDirection="column"
                  style={{
                    paddingRight: "35px",
                    overflow: "hidden",
                    overflowY: "auto ",
                    flexGrow: 1,
                    marginRight: -16,
                  }}
                >
                  {chat.map((element) => (
                    <Box
                      ref={chatContainerRef}
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
                    value={message}
                    type="text"
                    placeholder="Enter your message"
                    style={{
                      width: "100%",
                      borderRadius: "18px",
                      height: "35px",
                      paddingLeft: "10px",
                      backgroundColor: "transparent",
                      border: "1px solid #b716d8",
                      outline: "none",
                    }}
                  />
                  <IconButton color="primary" onClick={handleSend}>
                    <SendIcon />
                  </IconButton>
                </Box>
              </>
            )}
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
