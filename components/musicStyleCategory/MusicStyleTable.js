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

const MusicStyleTable = (props) => {
    const {
  
 
    isUpdated,
   
  } = useContext(AppContext);
 
  const [tableData, setTableData] = useState([]);
  const [editingMusicStyleId, setEditingMusicStyleId] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const fetchData = async () => {
    try {
      const response = await GET("/musicStyle");

      setTableData(response.data);
    } catch (error) {
      console.error("Failed to fetch musicStyle data:", error);
    }
  };

  const handleUpdate = async (musicStyleId) => {
    try {
      await UPDATE(`/musicStyle/${musicStyleId}`, updatedData);
      console.log(`Updated musicStyle with ID: ${musicStyleId}`);
      setEditingMusicStyleId(null);
      setUpdatedData({});
      fetchData();
    } catch (error) {
      console.error(`Failed to update musicStyle with ID: ${musicStyleId}`, error);
    }
  };

  const handleDelete = async (musicStyleId) => {
    try {
      await DELETE(`/musicStyle/${musicStyleId}`);
      console.log(`Deleted musicStyle with ID: ${musicStyleId}`);
      fetchData();
    } catch (error) {
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
