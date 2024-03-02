import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { useConfirmModal } from "../stores/useConfirmModal";

export interface ModalConfirmDialogProps {}

const ModalConfirmDialog: React.FC<ModalConfirmDialogProps> = () => {
  const { open, text, title, callbackHandler, handleShowConfirmModal } =
    useConfirmModal();

  function handleOk() {
    callbackHandler();
    handleShowConfirmModal(() => {});
  }

  function handleCancel() {
    handleShowConfirmModal(() => {});
  }

  return (
    <Dialog maxWidth="sm" open={open} onClose={handleCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Typography>{text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          {"Cancel"}
        </Button>
        <Button onClick={handleOk}>{"OK"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirmDialog;
