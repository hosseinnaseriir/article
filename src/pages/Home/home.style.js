import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
  },

  homeContainer: {
    display: "flex",
    height: "90vh",
    gap: "1rem",
    flexWrap: "wrap",
    alignItems: "center",
  },
}));
