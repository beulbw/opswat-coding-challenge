import React from "react";
import { UserListContext } from "./userList.interface";
import { DataGrid } from "@mui/x-data-grid";

export interface UserListPageProps {}

const UserListPage: React.FC<UserListPageProps> = () => {
  const { rows, columns } = React.useContext(UserListContext);

  return (
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
  );
};

export default UserListPage;
