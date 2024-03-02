import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useSnackBar } from "../stores/useSnackbar";

export type CustomSnackBarProps = {};

const CustomSnackBar: React.FC<CustomSnackBarProps> = () => {
  const { open, message, severity, closeSnack } = useSnackBar((s) => s);

  return (
    <>
      {open && (
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={closeSnack}
          autoHideDuration={3000}
        >
          <Alert onClose={closeSnack} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default CustomSnackBar;
