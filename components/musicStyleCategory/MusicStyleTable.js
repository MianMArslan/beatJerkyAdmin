import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  Typography,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import { GET, DELETE, UPDATE } from "../../services/httpClient";
import { AppContext } from "@/context/appContext";
import { useRouter } from "next/router";

const MusicStyleTable = (props) => {
    const {
  
 setSnackbarState,
    isUpdated,
   
  } = useContext(AppContext);
 const router=useRouter();
  const [tableData, setTableData] = useState([]);
  const [editingMusicStyleId, setEditingMusicStyleId] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
    const [allSongs, setAllSongs] = useState();

  const fetchData = async () => {
    try {
      const response = await GET("/musicStyle");

      setTableData(response.data);
    } catch (error) {
      console.error("Failed to fetch musicStyle data:", error);
    }
  };
async function getAllSongs(){
      const searchQuery = router.query.search || '';

    // Construct the API endpoint URL with the search query parameter
    const endpoint = `/musicStyleSongs?search=${encodeURIComponent(searchQuery)}`;
    
    const response = await GET(endpoint);
    setAllSongs(response.songs)
 }
  const handleUpdate = async (musicStyleId) => {
    try {
      await UPDATE(`/musicStyle/${musicStyleId}`, updatedData);
      console.log(`Updated musicStyle with ID: ${musicStyleId}`);
      setEditingMusicStyleId(null);
      setUpdatedData({});
      fetchData();
          setSnackbarState({
          severity: "success",
          open: true,
          message: `Music Style Category Updated!`,
        });
    } catch (error) {
      console.error(`Failed to update musicStyle with ID: ${musicStyleId}`, error);
            setSnackbarState({
          severity: "error",
          open: true,
          message: `Failed to update musicStyle with ID: ${musicStyleId}`,
        });
    }
  };

  const handleDelete = async (musicStyleId) => {
       for(let song of allSongs)
    {
      if(song.songCategoryID==musicStyleId){
  setSnackbarState({
          severity: "error",
          open: true,
          message: "Can not delete category as songs are added with this category",
        });
        return;
      }

    }
    try {
      await DELETE(`/musicStyle/${musicStyleId}`);
      console.log(`Deleted musicStyle with ID: ${musicStyleId}`);
      fetchData();
               setSnackbarState({
          severity: "success",
          open: true,
          message: `Deleted musicStyle with ID: ${musicStyleId}`,
        });
    } catch (error) {
              setSnackbarState({
          severity: "success",
          open: true,
          message: `Failed to delete musicStyle with ID: ${musicStyleId}`,
        });
      console.error(`Failed to delete musicStyle with ID: ${musicStyleId}`, error);
    }
  };

  const handleEditClick = (musicStyleId) => {
    setEditingMusicStyleId(musicStyleId);
    setUpdatedData(tableData.find((item) => item.id === musicStyleId));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
        getAllSongs();

    fetchData();
  }, [isUpdated]);
  return (
    <TableContainer component={Paper}>
      <Table style={{ borderCollapse: "separate", borderSpacing: "0px" }}>
        <TableHead>
          <TableRow style={{ backgroundColor: "black" }}>
            <TableCell>
              <Typography>Music Style ID</Typography>
            </TableCell>
            <TableCell>
              <Typography>Music Style Name</Typography>
            </TableCell>
            <TableCell>
              <Typography>Music Style Description</Typography>
            </TableCell>
            <TableCell>
              <Typography>Delete</Typography>
            </TableCell>
            <TableCell>
              <Typography>Update</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((musicStyle) => (
            <TableRow key={musicStyle.id} style={{ backgroundColor: "black" }}>
              <TableCell>
                <Typography>{musicStyle.id}</Typography>
              </TableCell>
              <TableCell style={{ width: "20%" }}>
                {editingMusicStyleId === musicStyle.id ? (
                  <TextField
                    size="small"
                    name="musicStyleName"
                    defaultValue={updatedData.musicStyleName || musicStyle.musicStyleName}
                     
                    onChange={handleInputChange}
                    fullWidth
                  />
                ) : (
                  <Typography>{musicStyle.musicStyleName}</Typography>
                )}
              </TableCell>
              <TableCell style={{ width: "60%" }}>
                {editingMusicStyleId === musicStyle.id ? (
                  <TextField
                    size="small"
                    name="musicStyleDescription"
                    defaultValue={
                      updatedData.musicStyleDescription ||
                      musicStyle.musicStyleDescription
                    }
                    onChange={handleInputChange}
                    fullWidth
                  />
                ) : (
                  <Typography>{musicStyle.musicStyleDescription}</Typography>
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(musicStyle.id)}
                >
                  Delete
                </Button>
              </TableCell>
              <TableCell style={{ width: "10%" }}>
                {editingMusicStyleId === musicStyle.id ? (
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleUpdate(musicStyle.id)}
                  >
                    Done
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => handleEditClick(musicStyle.id)}
                  >
                    Edit
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MusicStyleTable;
