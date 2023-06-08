import React from 'react';
import { Table, TableBody,Typography, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const Category = () => {
  // Sample data for demonstration
  const categories = [
    { id: 1, name: 'Category 1', description: 'Description 1' },
    { id: 2, name: 'Category 2', description: 'Description 2' },
    { id: 3, name: 'Category 3', description: 'Description 3' },
    { id: 4, name: 'Category 4', description: 'Description 4' },
  ];

  const handleDelete = (categoryId) => {
    // Handle delete action for the category with the given ID
    console.log(`Deleting category with ID: ${categoryId}`);
  };

  const handleUpdate = (categoryId) => {
    // Handle update action for the category with the given ID
    console.log(`Updating category with ID: ${categoryId}`);
  };

  return (
    <TableContainer component={Paper}   >
      <Table style={{ borderCollapse: 'separate', borderSpacing: '0px' }}>
        <TableHead>
          <TableRow style={{ backgroundColor: "black" }}>
            <TableCell><Typography>Category ID</Typography></TableCell>
            <TableCell><Typography>Category Name</Typography></TableCell>
            <TableCell><Typography>Category Description</Typography></TableCell>
            <TableCell><Typography>Delete</Typography></TableCell>
            <TableCell><Typography>Update</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={category.id} style={{ backgroundColor:  "black" }}>
              <TableCell><Typography>{category.id}</Typography></TableCell>
              <TableCell><Typography>{category.name}</Typography></TableCell>
              <TableCell><Typography>{category.description}</Typography></TableCell>
              <TableCell>
                <Button variant="outlined" color='error' onClick={() => handleDelete(category.id)}>Delete</Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" color='warning' onClick={() => handleUpdate(category.id)}>Update</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Category;
