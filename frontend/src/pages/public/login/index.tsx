import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import _get from "lodash/get";
import React from "react";
import { LoginContext } from "./login.interface";

export interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const { handleSubmit, register, errors } = React.useContext(LoginContext);

  React.useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Paper elevation={2}>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingY: 3,
              paddingX: 5,
              rowGap: 2,
            }}
          >
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontWeight: 500,
                  fontSize: "1.5rem",
                  textAlign: "center",
                }}
              >
                {"Welcome!"}
              </Typography>
              <Typography
                component="span"
                sx={{
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                {"Log in to start using the application"}
              </Typography>
            </Box>
            <Box component="div" width="20vw">
              <TextField
                {...register("email")}
                fullWidth
                required
                variant="filled"
                label="Email"
                name="email"
                placeholder="Enter your email"
                error={errors?.email !== undefined}
                helperText={_get(errors, ["email", "message"], "")}
              />
            </Box>
            <Box component="div" width="20vw">
              <TextField
                {...register("password")}
                fullWidth
                required
                variant="filled"
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                error={errors?.password !== undefined}
                helperText={_get(errors, ["password", "message"], "")}
                inputProps={{
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
              />
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                paddingY: 1,
              }}
            >
              {"Log in"}
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="success"
              sx={{
                paddingY: 1,
              }}
              onClick={() => (window.location.href = "/register")}
            >
              {"Register"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </form>
  );
};

export default LoginPage;
