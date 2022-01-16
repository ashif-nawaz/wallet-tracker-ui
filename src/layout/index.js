import { Box } from "@mui/material";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box component="main" mt={3}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
