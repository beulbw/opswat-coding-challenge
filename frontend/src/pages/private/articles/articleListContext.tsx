import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import ArticleListPage from ".";
import { ArticleService } from "../../../apis/articleService";
import { useConfirmModal } from "../../../stores/useConfirmModal";
import { useSnackBar } from "../../../stores/useSnackbar";
import { ArticleListContext } from "./articleList.interface";
import { ArticleDTO } from "../../../apis/articleService/article.interface";
import ArticleItemDialog from "./itemDialog";

export type ArticleListContextProviderProps = {};

const ArticleListContextProvider: React.FC<
  ArticleListContextProviderProps
> = () => {
  const Service = new ArticleService();

  const { openSnack } = useSnackBar();
  const { handleShowConfirmModal } = useConfirmModal();

  const [rows, setRows] = React.useState<ArticleDTO[]>([]);
  const [currentItem, setCurrentItem] = React.useState<ArticleDTO>();
  const [openItemDialog, setOpenItemDialog] = React.useState<boolean>(false);

  const columns: GridColDef<ArticleDTO>[] = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "body", headerName: "Body", flex: 1 },
    { field: "favouriteCount", headerName: "Favourite Count", flex: 1 },
    {
      field: "createdAt",
      headerName: "Created Date",
      flex: 1,
      valueGetter: ({ value }) =>
        value && moment(value).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      field: "updatedAt",
      headerName: "Updated Date",
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
            icon={
              props.row.favouriteCount === 0 ? (
                <FavoriteBorderIcon />
              ) : (
                <FavoriteIcon />
              )
            }
            label="Favourite"
            color="success"
            onClick={() =>
              props.row.id !== undefined &&
              props.row.favouriteCount !== undefined &&
              handleFavoriteRow(props.row.favouriteCount, props.row.id)
            }
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            color="info"
            onClick={() => handleEditRow(props.row)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="error"
            onClick={() => props.row.id && handleDeleteRow(props.row.id)}
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

  const handleAddRow = React.useCallback(() => {
    setCurrentItem(undefined);
    setOpenItemDialog(true);
  }, []);

  const handleEditRow = React.useCallback((row: ArticleDTO) => {
    setCurrentItem(row);
    setOpenItemDialog(true);
  }, []);

  const handleSaveRow = React.useCallback(async (row: ArticleDTO) => {
    await (row.id ? Service.update(row) : Service.create(row))
      .then((response) => {
        if (response.data) {
          handleCloseDialog();
          handleGetList();
        }
      })
      .catch((error) => {
        openSnack("error", error.message);
      });
  }, []);

  const handleFavoriteRow = React.useCallback(
    async (favouriteCount: number, id: number) => {
      await (favouriteCount === 0
        ? Service.favourite(id)
        : Service.unfavourite(id)
      )
        .then((response) => {
          if (response.data) {
            openSnack("success", response.data.message);
            handleGetList();
          }
        })
        .catch((error) => {
          openSnack("error", error.message);
        });
    },
    []
  );

  const handleCloseDialog = React.useCallback(() => {
    setCurrentItem(undefined);
    setOpenItemDialog(false);
  }, []);

  const handleDeleteRow = React.useCallback(async (id: number) => {
    handleShowConfirmModal(
      () => handleDeleteArticle(id),
      "Confirm deletion",
      "Are you sure that you want to delete this article?"
    );
  }, []);

  const handleDeleteArticle = React.useCallback(async (id: number) => {
    await Service.delete(id)
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
    <ArticleListContext.Provider
      value={{ rows, columns, currentItem, openItemDialog, handleAddRow }}
    >
      <ArticleListPage />
      {openItemDialog && (
        <ArticleItemDialog
          handleClose={handleCloseDialog}
          handleSave={handleSaveRow}
        />
      )}
    </ArticleListContext.Provider>
  );
};

export default ArticleListContextProvider;
