import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button, LinearProgress } from "@mui/material";
import { Chip } from "@mui/material";
import { AppContext } from "../../context/appContext";
import { useContext } from "react";
import { UPDATE, GET } from "../../services/httpClient";
import { useRouter } from "next/router";

export default function UserProfileCard(props) {
  const router = useRouter();
  const {
    isLoading,
    setIsLoading,
    setSnackbarState,
    isUsersUpdated,
    setIsUsersUpdated,
  } = useContext(AppContext);
  const { data, setUserId, setOpen } = props;
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
    background:
      "linear-gradient(to bottom, rgba(1, 1, 87, 1), rgba(222, 0, 247, 1))",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const [response, setResponse] = React.useState();
  const [isLoadingCard, setIsLoadingCard] = React.useState(true);

  async function getFollowersAndFollowing() {
    setIsLoadingCard(true);
    const a = await GET("/follower", { params: { userId: data.id } });
    setResponse(a);
    setIsLoadingCard(false);
  }

  React.useEffect(() => {
    getFollowersAndFollowing();
  }, []);

  async function handleSuspendUser() {
    setIsLoading(true);
    const params = { isDeleted: true };
    const response = await UPDATE(`/users/${data.id}`, params);
    if (response) {
      setSnackbarState({
        severity: "success",
        open: true,
        message: "Profile Status Changed",
      });
      setIsLoading(false);
      setIsUsersUpdated(!isUsersUpdated);
    } else {
      setSnackbarState({
        severity: "error",
        open: true,
        message: "An Error Occurred!",
      });
      setIsLoading(false);
    }
  }

  async function handleActivateUser() {
    setIsLoading(true);
    const params = { isDeleted: false };
    const response = await UPDATE(`/users/${data.id}`, params);
    if (response) {
      setSnackbarState({
        severity: "success",
        open: true,
        message: "Profile Status Changed",
      });
      setIsLoading(false);
      setIsUsersUpdated(!isUsersUpdated);
    } else {
      setSnackbarState({
        severity: "error",
        open: true,
        message: "An Error Occurred!",
      });
      setIsLoading(false);
    }
  }

  return (
    <Card
      sx={{
        maxWidth: 250,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 4px 20px rgba(0, 123, 255, 0.3)",
        },
      }}
    >
      {isLoadingCard && <LinearProgress />}
      <CardContent style={cardStyle}>
        {data.isDeleted ? (
          <Chip
            color="error"
            sx={{ marginBottom: "10px" }}
            size="small"
            label="Deleted"
          />
        ) : (
          <Chip
            color="success"
            sx={{ marginBottom: "10px" }}
            size="small"
            label="Active"
          />
        )}
        <Avatar
          alt={data.firstName ? data.firstName : "N/A"}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${data.profileImg?.replace(
            "public",
            ""
          )}`}
          sx={{ width: 40, height: 40 }}
        />

        <Chip
          label={
            data.firstName ? ` ${data.firstName}  ${data.lastName}` : "N/A"
          }
        />
        <Typography>
          Following: {response?.data.following} | Followers:{" "}
          {response?.data.follower}
        </Typography>
        <Box display="flex">
          {data.isDeleted ? (
            <Button
              onClick={handleActivateUser}
              style={{ backgroundColor: "#00d438", marginTop: "15px" }}
            >
              <Typography sx={{ fontSize: "12px", transform: "none" }}>
                Activate User
              </Typography>
            </Button>
          ) : (
            <Button
              size="small"
              onClick={handleSuspendUser}
              style={{ backgroundColor: "#c20000", marginTop: "15px" }}
            >
              <Typography sx={{ fontSize: "12px", transform: "none" }}>
                Suspend User
              </Typography>
            </Button>
          )}
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              router.push(`/user-profile/?userId=${data.id}`);
            }}
          >
            <Typography sx={{ fontSize: "12px", transform: "none" }}>
              View Profile
            </Typography>
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
