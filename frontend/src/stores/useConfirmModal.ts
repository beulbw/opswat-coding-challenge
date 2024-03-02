import { create } from "zustand";

type UseConfirmModalProps = {
  open: boolean;
  title: string;
  text: string;
  callbackHandler: () => void;
  handleShowConfirmModal: (
    callbackHandler: () => void,
    title?: string,
    text?: string
  ) => void;
};

const initialValues: UseConfirmModalProps = {
  open: false,
  title: "Confirm",
  text: "Are you sure that you want to carry out this action?",
  callbackHandler: () => {},
  handleShowConfirmModal: () => {},
};

export const useConfirmModal = create<UseConfirmModalProps>((set) => ({
  ...initialValues,
  handleShowConfirmModal: (
    callbackHandler: () => void,
    title?: string,
    text?: string
  ) => {
    return set((state) => ({
      ...state,
      open: !state.open,
      title: title ?? "Confirm",
      text: text ?? "Are you sure that you want to carry out this action?",
      callbackHandler,
    }));
  },
}));
