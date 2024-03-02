import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LoginPage from ".";
import { AuthenticationService } from "../../../apis/authService";
import { LoginRequest } from "../../../apis/authService/auth.interface";
import { useSnackBar } from "../../../stores/useSnackbar";
import { LoginContext } from "./login.interface";

export type LoginContextProviderProps = {};

const LoginContextProvider: React.FC<LoginContextProviderProps> = ({}) => {
  const navigate = useNavigate();
  const { openSnack } = useSnackBar();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email("Invalid email")
      .required("Email cannot be empty"),
    password: Yup.string().trim().required("Password cannot be empty"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  async function handleLogin(values: LoginRequest) {
    await new AuthenticationService()
      .login(values)
      .then((response) => {
        if (response.data && response.data.result) {
          localStorage.setItem(
            "USER_DATA",
            JSON.stringify(response.data.result)
          );
          openSnack("success", response.data.message);
          navigate("/users");
        }
      })
      .catch((error) => {
        openSnack("error", error.message);
      });
  }

  return (
    <LoginContext.Provider
      value={{
        register,
        errors,
        handleSubmit: handleSubmit(handleLogin),
      }}
    >
      <LoginPage />
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
