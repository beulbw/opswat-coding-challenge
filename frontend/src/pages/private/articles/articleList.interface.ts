import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { ArticleDTO } from "../../../apis/articleService/article.interface";

export type ArticleListContextProps = {
  rows: ArticleDTO[];
  columns: GridColDef[];
  currentItem?: ArticleDTO;
  openItemDialog: boolean;
  handleAddRow: () => void;
};

export const ArticleListContext = React.createContext<ArticleListContextProps>({
  rows: [],
  columns: [],
  openItemDialog: false,
  handleAddRow: () => {},
});
