import React, { useContext, useEffect, useState } from "react";
import { Card, CardMedia, Typography } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { contexts } from "../../contexts";
import Helmet from "react-helmet";
import parse from "html-react-parser";

function Article() {
  const { articles } = useContext(contexts);

  const params = useParams();
  const search = useSearchParams();

  console.log(params);
  console.log(search);
  const location = useLocation();
  //   const path = location.pathname.split("/");
  //   console.log(path[2]);
  const pathNormalName = location.pathname.slice(9);
  const [currentArticle, setCurrentArticle] = useState({});

  useEffect(() => {
    const actualArticle = articles.filter(
      (article) => article.normalName === pathNormalName
    ); //[{}]
    setCurrentArticle(actualArticle[0]);
  }, []);

  return (
    <>
      <Helmet>
        <meta name="keywords" content={currentArticle.tags} />
        <title>{currentArticle.title}</title>
      </Helmet>

      <Card>
        <CardHeader title={currentArticle.title} />
        <CardMedia
          component="img"
          height="140"
          image={currentArticle.img}
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {currentArticle.fullArticle}
            {parse(currentArticle.article || ' ')}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}

export default Article;
