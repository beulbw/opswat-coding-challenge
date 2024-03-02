import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export interface PageContainerProps {
  children?: React.ReactNode;
  title: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, title }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function handleMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function logOut() {
    localStorage.removeItem("USER_DATA");
    navigate("/login");
  }

  React.useEffect(() => {
    document.title = title;
  }, []);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <div>
            <IconButton size="large" onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              keepMounted
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => navigate("/users")}>{"Users"}</MenuItem>
              <MenuItem onClick={() => navigate("/articles")}>
                {"Articles"}
              </MenuItem>
              <MenuItem onClick={logOut}>{"Log out"}</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Box>{children}</Box>
    </Box>
  );
};

export default PageContainer;
