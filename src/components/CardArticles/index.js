import { React } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { useStyles } from "./cardarticles.style";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { CardMedia, Grid } from "@mui/material";

const CardArticles = ({ title, onClick ,summary, img, icon, icon1 }) => {
  const classes = useStyles();

  return (
    <Grid onClick={onClick} item lg={3} className={classes.root}>
      <Card>
        <Card>
          <CardHeader title={title} />
          <CardMedia
            component="img"
            height="140"
            image={img}
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {summary}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">{icon}</IconButton>
            <IconButton aria-label="share">{icon1}</IconButton>
          </CardActions>
        </Card>
      </Card>
    </Grid>
  );
};

export default CardArticles;
