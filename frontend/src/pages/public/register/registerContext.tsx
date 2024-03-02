import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import RegisterPage from ".";
import { AuthenticationService } from "../../../apis/authService";
import { RegisterRequest } from "../../../apis/authService/auth.interface";
import { useSnackBar } from "../../../stores/useSnackbar";
import { RegisterContext } from "./register.interface";

export type RegisterContextProviderProps = {};

const RegisterContextProvider: React.FC<RegisterContextProviderProps> = () => {
  const navigate = useNavigate();
  const { openSnack } = useSnackBar();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email("Invalid email")
      .required("Email cannot be empty"),
    password: Yup.string()
      .trim()
      .required("Password cannot be empty")
      .min(8, "Password must have at least 8 characters")
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_])(?=\S+$).{8,}$/,
        "Password must include: a lowercase letter, an uppercase letter, a special character, and a number"
      ),
    username: Yup.string().trim().required("Username cannot be empty"),
    fullname: Yup.string().trim().required("Full name cannot be empty"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
      fullname: "",
    },
    resolver: yupResolver(validationSchema),
  });

  async function handleRegister(values: RegisterRequest) {
    await new AuthenticationService()
      .register(values)
      .then((response) => {
        if (response.data) {
          openSnack("success", response.data.message);
          navigate("/login");
        }
      })
      .catch((error) => {
        openSnack("error", error.message);
      });
  }

  React.useEffect(() => {
    document.title = "Register";
  }, []);

  return (
    <RegisterContext.Provider
      value={{
        register,
        errors,
        handleSubmit: handleSubmit(handleRegister),
      }}
    >
      <RegisterPage />
    </RegisterContext.Provider>
  );
};

export default RegisterContextProvider;
