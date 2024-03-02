import React from "react";
import { UserDTO } from "../../../apis/userService/user.interface";
import { GridColDef } from "@mui/x-data-grid";

export type UserListContextProps = {
  rows: UserDTO[];
  columns: GridColDef[];
};

export const UserListContext = React.createContext<UserListContextProps>({
  rows: [],
  columns: [],
});
