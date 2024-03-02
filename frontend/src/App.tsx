import { Box, Fade } from "@mui/material";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CustomLoadingSpinner from "./components/customLoadingSpinner";
import CustomSnackBar from "./components/customSnackbar";
import ModalConfirmDialog from "./components/modalConfirm";
import PageContainer from "./components/pageContainer";
import ArticleListContextProvider from "./pages/private/articles/articleListContext";
import UserListContextProvider from "./pages/private/users/userListContext";
import LoginContextProvider from "./pages/public/login/loginContext";
import RegisterContextProvider from "./pages/public/register/registerContext";
import { PUBLIC_ROUTES } from "./routes/public.routes";
import { ComponentRouteProps } from "./routes/routes.interface";
import { PRIVATE_ROUTES } from "./routes/private.routes";
import { AuthHOC } from "./components/pageContainer/authHOC";

function App() {
  return (
    <Suspense fallback={<div></div>}>
      <Fade in timeout={400}>
        <Box className="base-layout">
          <CustomSnackBar />
          <CustomLoadingSpinner />
          <ModalConfirmDialog />
          <BrowserRouter>
            <Routes>
              {PUBLIC_ROUTES.map((route: ComponentRouteProps) => (
                <Route
                  key={route.key}
                  path={route.path}
                  Component={route.component}
                />
              ))}
              {/* <Route path="/login" Component={() => <LoginContextProvider />} />
              <Route
                path="/register"
                Component={() => <RegisterContextProvider />}
              /> */}

              {PRIVATE_ROUTES.map((route: ComponentRouteProps) => {
                return (
                  <Route
                    key={route.key}
                    path={route.path}
                    Component={() => AuthHOC(route.component, route.name)}
                  />
                );
              })}
              {/* <Route
                path="/users"
                Component={() => (
                  <PageContainer title="Users">
                    <UserListContextProvider />
                  </PageContainer>
                )}
              />
              <Route
                path="/articles"
                Component={() => (
                  <PageContainer title="Articles">
                    <ArticleListContextProvider />
                  </PageContainer>
                )}
              /> */}
            </Routes>
          </BrowserRouter>
        </Box>
      </Fade>
    </Suspense>
  );
}

export default App;
