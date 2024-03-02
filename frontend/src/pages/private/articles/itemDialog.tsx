import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import _get from "lodash/get";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { ArticleDTO } from "../../../apis/articleService/article.interface";
import { ArticleListContext } from "./articleList.interface";

export interface ArticleItemDialogProps {
  handleSave: (row: ArticleDTO) => void;
  handleClose: () => void;
}

const ArticleItemDialog: React.FC<ArticleItemDialogProps> = ({
  handleSave,
  handleClose,
}) => {
  const { openItemDialog, currentItem } = React.useContext(ArticleListContext);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .trim()
      .required("Title cannot be empty")
      .max(250, "Title cannot be more than 100 characters"),
    body: Yup.string()
      .trim()
      .required("Body cannot be empty")
      .max(10000, "Title cannot be more than 100000 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleDTO>({
    defaultValues: {
      title: "",
      body: "",
      ...currentItem,
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <Dialog maxWidth="md" open={openItemDialog} onClose={handleClose}>
      <form noValidate onSubmit={handleSubmit(handleSave)}>
        <DialogTitle>{"Article"}</DialogTitle>
        <DialogContent
          dividers
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: 2,
            width: "40vw",
          }}
        >
          <TextField
            {...register("title")}
            fullWidth
            required
            variant="filled"
            label="Title"
            name="title"
            placeholder="Enter article title"
            error={errors?.title !== undefined}
            helperText={_get(errors, ["title", "message"], "")}
          />
          <TextField
            {...register("body")}
            fullWidth
            required
            multiline
            maxRows={15}
            variant="filled"
            label="Body"
            name="body"
            placeholder="Enter article body"
            error={errors?.body !== undefined}
            helperText={_get(errors, ["body", "message"], "")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{"Cancel"}</Button>
          <Button type="submit">{"Save"}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ArticleItemDialog;
