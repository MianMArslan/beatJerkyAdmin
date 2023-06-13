import React, { useEffect, useState } from "react";
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

const Category = (props) => {
  const { update } = props;
  const [tableData, setTableData] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const fetchData = async () => {
    try {
      const response = await GET("/category");

      setTableData(response.data);
    } catch (error) {
      console.error("Failed to fetch category data:", error);
    }
  };

  const handleUpdate = async (categoryId) => {
    try {
      await UPDATE(`/category/${categoryId}`, updatedData);
      console.log(`Updated category with ID: ${categoryId}`);
      setEditingCategoryId(null);
      setUpdatedData({});
      fetchData();
    } catch (error) {
      console.error(`Failed to update category with ID: ${categoryId}`, error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await DELETE(`/category/${categoryId}`);
      console.log(`Deleted category with ID: ${categoryId}`);
      fetchData();
    } catch (error) {
      console.error(`Failed to delete category with ID: ${categoryId}`, error);
    }
  };

  const handleEditClick = (categoryId) => {
    setEditingCategoryId(categoryId);
    setUpdatedData(tableData.find((item) => item.id === categoryId));
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
  }, [update]);
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
                    name="categoryName"
                    value={updatedData.categoryName || category.categoryName}
                    onChange={handleInputChange}
                    fullWidth
                  />
                ) : (
                  <Typography>{category.categoryName}</Typography>
                )}
              </TableCell>
              <TableCell style={{ width: "60%" }}>
                {editingCategoryId === category.id ? (
                  <TextField
                    size="small"
                    name="categoryDescription"
                    value={
                      updatedData.categoryDescription ||
                      category.categoryDescription
                    }
                    onChange={handleInputChange}
                    fullWidth
                  />
                ) : (
                  <Typography>{category.categoryDescription}</Typography>
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
