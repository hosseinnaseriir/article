import { useStyles } from "./homeCard.style";
import { ButtonBase, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const HomeCard = ({ icon, title, href = "#", onClick }) => {
  const classes = useStyles();
  return (
    <ButtonBase onClick={onClick} className={classes.homeCard}>
      <Link to={href}>
        {icon}
        <Typography>{title}</Typography>
      </Link>
    </ButtonBase>
  );
};
