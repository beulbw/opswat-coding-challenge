import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export type BaseContextProps<T extends Object> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

export type DataResponse<T> = {
  data: {
    code: number;
    message: string;
    result?: T;
    description?: string;
  };
};
