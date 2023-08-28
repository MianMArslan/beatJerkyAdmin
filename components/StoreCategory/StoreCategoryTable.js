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

const Category = (props) => {
  const { isUpdated, setSnackbarState } = useContext(AppContext);
  const [tableData, setTableData] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [allStores, setAllStores] = useState();

  const router = useRouter();
  const fetchData = async () => {
    try {
      const response = await GET("/storeCategory");

      setTableData(response.data);
    } catch (error) {
      console.error("Failed to fetch category data:", error);
    }
  };
  async function getAllStores() {
    const searchQuery = router.query.search || "";

    // Construct the API endpoint URL with the search query parameter
    const endpoint = `/stores?search=${encodeURIComponent(searchQuery)}`;

    const response = await GET(endpoint);
    console.log(
      "🚀 ~ file: StoreCategoryTable.js:42 ~ getAllStores ~ response:",
      response
    );
    setAllStores(response.stores);
  }
  const handleUpdate = async (storeCategoryId) => {
    try {
      await UPDATE(`/storeCategory/${storeCategoryId}`, updatedData);
      console.log(`Updated category with ID: ${storeCategoryId}`);
      setEditingCategoryId(null);
      setUpdatedData({});
      fetchData();
      setSnackbarState({
        severity: "success",
        open: true,
        message: `Category Updated!`,
      });
    } catch (error) {
      console.error(
        `Failed to update category with ID: ${storeCategoryId}`,
        error
      );
      setSnackbarState({
        severity: "error",
        open: true,
        message: `Failed to update category with ID: ${storeCategoryId}`,
      });
    }
  };

  const handleDelete = async (storeCategoryId) => {
    for (let store of allStores) {
      if (store.storeCategoryId == storeCategoryId) {
        setSnackbarState({
          severity: "error",
          open: true,
          message:
            "Can not delete category as songs are added with this category",
        });
        return;
      }
    }
    try {
      await DELETE(`/storeCategory/${storeCategoryId}`);
      console.log(`Deleted category with ID: ${storeCategoryId}`);
      fetchData();
      setSnackbarState({
        severity: "success",
        open: true,
        message: `Deleted category with ID: ${storeCategoryId}`,
      });
    } catch (error) {
      console.error(
        `Failed to delete category with ID: ${storeCategoryId}`,
        error
      );
      setSnackbarState({
        severity: "error",
        open: true,
        message: `Failed to delete category with ID: ${storeCategoryId}`,
      });
    }
  };

  const handleEditClick = (storeCategoryId) => {
    setEditingCategoryId(storeCategoryId);
    setUpdatedData(tableData.find((item) => item.id === storeCategoryId));
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
    getAllStores();
  }, [isUpdated]);

  useEffect(() => {
    console.log(
      "🚀 ~ file: StoreCategoryTable.js:123 ~ Category ~ allStores:",
      allStores
    );
  }, [allStores]);

  return (
    <TableContainer component={Paper}>
      <Table style={{ borderCollapse: "separate", borderSpacing: "0px" }}>
        <TableHead>
          <TableRow style={{ backgroundColor: "black" }}>
            <TableCell>
              <Typography>Category ID</Typography>
            </TableCell>
            <TableCell>
              <Typography>Category Name</Typography>
            </TableCell>
            <TableCell>
              <Typography>Category Description</Typography>
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
          {tableData.map((category) => (
            <TableRow key={category.id} style={{ backgroundColor: "black" }}>
              <TableCell>
                <Typography>{category.id}</Typography>
              </TableCell>
              <TableCell style={{ width: "20%" }}>
                {editingCategoryId === category.id ? (
                  <TextField
                    size="small"
                    name="storeCategoryName"
                    defaultValue={
                      updatedData.storeCategoryName ||
                      category.storeCategoryName
                    }
                    onChange={handleInputChange}
                    fullWidth
                  />
                ) : (
                  <Typography>{category.storeCategoryName}</Typography>
                )}
              </TableCell>
              <TableCell style={{ width: "60%" }}>
                {editingCategoryId === category.id ? (
                  <TextField
                    size="small"
                    name="storeCategoryDescription"
                    defaultValue={
                      updatedData.storeCategoryDescription ||
                      category.storeCategoryDescription
                    }
                    onChange={handleInputChange}
                    fullWidth
                  />
                ) : (
                  <Typography>{category.storeCategoryDescription}</Typography>
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </Button>
              </TableCell>
              <TableCell style={{ width: "10%" }}>
                {editingCategoryId === category.id ? (
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleUpdate(category.id)}
                  >
                    Done
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => handleEditClick(category.id)}
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

export default Category;
