import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, ListItemButton } from "@mui/material";
import { useEffect, useState } from "react";
import { GET } from "@/services/httpClient";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { AppContext } from "@/context/appContext";
import { useContext } from "react";

const BlinkingBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.error.main, // Red color for offline users
    color: theme.palette.error.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function AlignItemsList() {
  const { selectedUser, setSelectedUser } = useContext(AppContext);
  const router = useRouter();
  const [nonAdminUsers, setNonAdminUsers] = useState([]);

  async function getAllUsers() {
    try {
      let response = await GET(`/adminChat?storeId=${router.query.storeId}`);
      const usersArray = response.data;

      // Filter out admin users and store online status
      const filteredUsers = usersArray
        .filter((user) => !user.sender.isAdmin)
        .map((user) => ({
          ...user,
          isOnline: user.sender.isOnline, // Modify this based on your user data structure
        }));

      setNonAdminUsers(filteredUsers);
    } catch (error) {
      console.error("An error occurred while fetching users:", error);
    }
  }

  useEffect(() => {
    getAllUsers();

    const userFetchInterval = setInterval(() => {
      getAllUsers();
    }, 2000);

    return () => {
      clearInterval(userFetchInterval);
    };
  }, [selectedUser, router.query.storeId]);

  return (
    <div style={{ overflowY: "auto", maxHeight: "300px" }}>
      {nonAdminUsers && (
        <List>
          {nonAdminUsers.map((user, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ pl: "0px" }}>
                <ListItemButton
                  onClick={() => {
                    setSelectedUser(user.sender.id);
                  }}
                  sx={{ pl: "0px" }}
                  key={index}
                >
                  <ListItemAvatar>
                    {user.sender.isOnline ? (
                      <BlinkingBadge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        variant="dot"
                      >
                        <Avatar
                          alt={user.sender.email}
                          src={user.sender.profileImg}
                        />
                      </BlinkingBadge>
                    ) : (
                      <BlinkingBadge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        variant="dot"
                      >
                        <Avatar
                          alt={user.sender.email}
                          src={user.sender.profileImg}
                        />
                      </BlinkingBadge>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.sender.firstName + " " + user.sender.lastName}
                    secondary={
                      <Typography
                        component="span"
                        color="text.primary"
                        fontSize={"12px"}
                      >
                        {user.sender.email}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </div>
  );
}
