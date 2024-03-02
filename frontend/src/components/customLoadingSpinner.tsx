import { Backdrop } from "@mui/material";
import { useLoadingAPI } from "../hooks/useLoadingAPI";
import { PropagateLoader } from "react-spinners";

export type CustomLoadingSpinnerProps = {};

const CustomLoadingSpinner: React.FC<CustomLoadingSpinnerProps> = () => {
  const { isLoadingAPI } = useLoadingAPI();

  return (
    <Backdrop open={isLoadingAPI}>
      <PropagateLoader color="#F7F8FC" />
    </Backdrop>
  );
};

export default CustomLoadingSpinner;