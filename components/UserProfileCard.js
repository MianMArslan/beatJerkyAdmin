import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Button, LinearProgress } from "@material-ui/core";
import { Chip } from "@mui/material";
import { AppContext } from "../context/appContext";
import { useContext } from "react";
import { UPDATE, GET } from "../services/httpClient";

export default function UserProfileCard(props) {
  const { isLoading, setIsLoading, setSnackbarState, isUsersUpdated, setIsUsersUpdated } = useContext(AppContext);
  const { data } = props;
   const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
    background: "linear-gradient(to bottom, rgba(1, 1, 87, 1), rgba(222, 0, 247, 1))",
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
          <Chip color="error" sx={{ marginBottom: "10px" }} size="small" label="Deleted" />
        ) : (
          <Chip color="success" sx={{ marginBottom: "10px" }} size="small" label="Active" />
        )}
        <Avatar
          alt={data.firstName ? data.firstName : "N/A"}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${data.profileImg?.replace('public', '')}`}
          sx={{ width: 100, height: 100 }}
        />

        <Chip label={data.firstName ? ` ${data.firstName}  ${data.lastName}` : "N/A"} />
        <Typography variant="body2">
          Following: {response?.data.following} | Followers: {response?.data.follower}
        </Typography>

        {data.isDeleted ? (
          <Button
            onClick={handleActivateUser}
            style={{ backgroundColor: "#00d438", marginTop: "15px" }}
          >
            Activate User
          </Button>
        ) : (
          <Button
            onClick={handleSuspendUser}
            style={{ backgroundColor: "#c20000", marginTop: "15px" }}
          >
            Suspend User
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
