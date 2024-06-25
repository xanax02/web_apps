import React, { useState } from "react";
import { useGetTransactionsQuery } from "store/query/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
  const theme = useTheme();

  //values to be send to backend
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSeachInput] = useState();

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User Id",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params?.value?.length || 0,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={"Transactions"} subtitle={"Entire list of Transactions"} />
      <Box
        mt={"40px"}
        height={"80vh"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& MuiDataGrid-virtualScrollbar": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[100]} !important`,
          },
        }}
      >
        {data && (
          <DataGrid
            getRowId={(row) => row._id}
            rows={data && data.transactions}
            rowsPerPageOptions={[20, 50, 100]}
            columns={columns}
            rowCount={(data && data.total) || 0}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            sortingMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModal) => setSort(...newSortModal)}
            slots={{ toolbar: DataGridCustomToolbar }}
            componentProps={{
              toolbar: { searchInput, setSeachInput, setSearch },
            }}
          />
        )}
        {isLoading && <p>Loading...</p>}
      </Box>
    </Box>
  );
};

export default Transactions;
