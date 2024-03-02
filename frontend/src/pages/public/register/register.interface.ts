import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RegisterRequest } from "../../../apis/authService/auth.interface";
import { BaseContextProps } from "../../../models/base.interface";

export type RegisterContextProps = BaseContextProps<RegisterRequest> & {};

export const RegisterContext = React.createContext<RegisterContextProps>({
  register: {} as UseFormRegister<RegisterRequest>,
  handleSubmit: {} as React.FormEventHandler<HTMLFormElement>,
  errors: {} as FieldErrors<RegisterRequest>,
});
