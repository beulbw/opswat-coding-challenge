import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import UserListPage from ".";
import { UserService } from "../../../apis/userService";
import { UserDTO } from "../../../apis/userService/user.interface";
import { useSnackBar } from "../../../stores/useSnackbar";
import { UserListContext } from "./userList.interface";
import { useConfirmModal } from "../../../stores/useConfirmModal";

export type UserListContextProviderProps = {};

const UserListContextProvider: React.FC<UserListContextProviderProps> = () => {
  const Service = new UserService();

  const { openSnack } = useSnackBar();
  const { handleShowConfirmModal } = useConfirmModal();

  const [rows, setRows] = React.useState<UserDTO[]>([]);

  const columns: GridColDef<UserDTO>[] = [
    { field: "email", headerName: "Email", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "fullname", headerName: "Full Name", flex: 1 },
    {
      field: "createdAt",
      headerName: "Created Date",
      flex: 1,
      valueGetter: ({ value }) =>
        value && moment(value).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      cellClassName: "actions",
      getActions: (props) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="error"
            onClick={() => handleDeleteRow(props.row.email)}
          />,
        ];
      },
    },
  ];

  const handleGetList = React.useCallback(async () => {
    await Service.getList()
      .then((response) => {
        if (response.data && response.data.result) {
          setRows(response.data.result);
        }
      })
      .catch((error) => {
        openSnack("error", error.message);
      });
  }, []);

  const handleDeleteRow = React.useCallback(async (email: string) => {
    handleShowConfirmModal(
      () => handleDeleteUser(email),
      "Confirm deletion",
      "Are you sure that you want to delete this user?"
    );
  }, []);

  const handleDeleteUser = React.useCallback(async (email: string) => {
    await Service.delete(email)
      .then((response) => {
        if (response.data && response.data) {
          openSnack("success", response.data.message);
          handleGetList();
        }
      })
      .catch((error) => {
        openSnack("error", error.message);
      });
  }, []);

  React.useEffect(() => {
    handleGetList();
  }, []);

  return (
    <UserListContext.Provider value={{ rows, columns }}>
      <UserListPage />
    </UserListContext.Provider>
  );
};

export default UserListContextProvider;
