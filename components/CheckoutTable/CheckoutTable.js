import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GET, UPDATE } from "@/services/httpClient"; // Import your UPDATE function
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Import the ExpandMoreIcon

const columns = [
  { id: "productName", label: "Product Name", minWidth: 120 },
  { id: "productId", label: "Product ID", minWidth: 100 },
  { id: "storeName", label: "Store Name", minWidth: 120 },
  { id: "storeId", label: "Store ID", minWidth: 120 },
  { id: "userId", label: "User ID", minWidth: 120 },
  { id: "userName", label: "User Name", minWidth: 120 },
  {
    id: "productPrice",
    label: "Product Price",
    minWidth: 100,
    align: "right",
    format: (value) => "$" + value.toLocaleString("en-US"),
  },
  {
    id: "productDiscount",
    label: "Product Discount",
    minWidth: 120,
    align: "right",
    format: (value) => value.toLocaleString("en-US") + "%",
  },
  {
    id: "OrderId",
    label: "Order ID",
    minWidth: 120,
  },
  {
    id: "orderStatus",
    label: "Order Status",
    minWidth: 120,
    align: "left",
    format: (value, row, updateOrderStatus) => (
      <OrderStatusButton
        value={value}
        row={row}
        updateOrderStatus={updateOrderStatus}
      />
    ),
  },
];

const OrderStatusButton = ({ value, row, updateOrderStatus }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      // Make an HTTP PUT request to update the order status
      // await UPDATE(`/checkout/${row.OrderId}`, { orderStatus: newStatus });

      // Assuming you have updated the order status in the backend successfully,
      // update the local data state to reflect the change
      updateOrderStatus(row, newStatus);
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      handleClose();
    }
  };

  return (
    <div>
      <Button
        variant="text"
        onClick={handleClick}
        sx={{
          color: "white",
          textTransform: "none",
          padding: 0, // Remove padding
          "& .MuiButton-endIcon": {
            marginLeft: 0, // Adjust the icon margin
          },
        }}
        endIcon={<ExpandMoreIcon />}
      >
        {value}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            backgroundColor: "#1c1c1c",
          },
        }}
      >
        <MenuItem onClick={() => handleStatusChange("Pending")}>
          Pending
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("Delivered")}>
          Delivered
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("Approved")}>
          Approved
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("Cancelled")}>
          Cancelled
        </MenuItem>
      </Menu>
    </div>
  );
};

export default function CheckoutTable() {
  const fetchDataFromDatabase = async () => {
    try {
      const response = await GET("/checkout");
      console.log(
        "🚀 ~ file: CheckoutTable.js:43 ~ fetchDataFromDatabase ~ response:",
        response
      );
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const updateOrderStatus = async (row, newStatus) => {
    try {
      // Make an HTTP PUT request to update the order status
      await UPDATE(
        `/checkout/?orderId=${row.OrderId}&orderStatus=${newStatus}`
      );

      // Assuming you have updated the order status in the backend successfully,
      // update the local data state to reflect the change
      setData((prevData) => {
        const updatedData = [...prevData];
        const rowIndex = updatedData.findIndex(
          (r) => r.OrderId === row.OrderId
        );
        if (rowIndex !== -1) {
          updatedData[rowIndex].orderStatus = newStatus;
        }
        return updatedData;
      });
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetchDataFromDatabase().then((fetchedData) => {
      setData(fetchedData);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{ backgroundColor: "black" }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, color: "white" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            color: "white",
                            padding: "10px",
                          }}
                        >
                          {column.format
                            ? column.format(value, row, updateOrderStatus)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              style: {
                backgroundColor: "#1c1c1c",
              },
            },
            sx: {
              "& ul": {
                backgroundColor: "#1c1c1c",
              },
            },
          },
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: "white",
          backgroundColor: "black",
        }}
      />
    </Paper>
  );
}
