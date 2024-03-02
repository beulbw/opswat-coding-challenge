import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { LoginRequest } from "../../../apis/authService/auth.interface";
import { BaseContextProps } from "../../../models/base.interface";

export type LoginContextProps = BaseContextProps<LoginRequest> & {};

export const LoginContext = React.createContext<LoginContextProps>({
  register: {} as UseFormRegister<LoginRequest>,
  handleSubmit: {} as React.FormEventHandler<HTMLFormElement>,
  errors: {} as FieldErrors<LoginRequest>,
});
