import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Loader = () => {

  return (
    <Box
      position="fixed"
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
      zIndex={1999}
      backgroundColor="rgba(0,0,0,0.75)"
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
