import { create } from "zustand";

type SnackBarProps = {
  open: boolean;
  message: string;
  severity: "error" | "warning" | "info" | "success";
  openSnack: (
    severity: "error" | "warning" | "info" | "success",
    message: string
  ) => void;
  closeSnack: () => void;
};

const initSnackbar: SnackBarProps = {
  open: false,
  message: "",
  severity: "success",
  openSnack: (
    severity: "error" | "warning" | "info" | "success",
    message: string
  ) => {},
  closeSnack: () => {},
};

export const useSnackBar = create<SnackBarProps>((set) => ({
  ...initSnackbar,
  openSnack: (
    severity: "error" | "warning" | "info" | "success",
    message: string
  ) => {
    return set((state) => ({
      ...state,
      open: true,
      severity: severity,
      message: message,
    }));
  },
  closeSnack: () => {
    return set((state) => ({
      ...state,
      open: false,
    }));
  },
}));
