import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";

function ChatBubble({ message, color }) {
  return (
    <Box
      p={1}
      borderRadius={5}
      maxWidth={200} // Adjust this value as needed
      minWidth={120} // Minimum width for shorter messages
      bgcolor={color}
      color="white"
      mt={1}
      ml={2}
      display="inline-block" // Keeps the bubbles inline
    >
      <Typography variant="body1" style={{ wordWrap: "break-word" }}>
        {message}
      </Typography>
    </Box>
  );
}

export default ChatBubble;
