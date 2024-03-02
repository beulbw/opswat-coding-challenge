import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { ArticleListContext } from "./articleList.interface";
import { Box, Button } from "@mui/material";

export interface ArticleListPageProps {}

const ArticleListPage: React.FC<ArticleListPageProps> = () => {
  const { rows, columns, handleAddRow } = React.useContext(ArticleListContext);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Button variant="contained" color="info" onClick={handleAddRow}>
          {"Add new article"}
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
    </>
  );
};

export default ArticleListPage;
