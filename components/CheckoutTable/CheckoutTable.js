import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { GET } from "@/services/httpClient";

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
    minWidth: 120,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "productDiscount",
    label: "Product Discount",
    minWidth: 120,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "OrderId", label: "Order ID", minWidth: 120 },
  { id: "orderStatus", label: "Order Status", minWidth: 120 },
];

// Replace this with your actual data fetching logic

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
                          sx={{ color: "white" }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
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
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: "white",
          backgroundColor: "black",
        }}
      />
      <style>
        {`
          .css-1vdlcvx-MuiPaper-root-MuiMenu-paper-MuiPopover-paper {
            background-color: #262626 !important;
          }
        `}
      </style>
    </Paper>
  );
}
