import React, { useContext } from "react";
import CardArticles from "../../components/CardArticles";
import { Box, Grid, Container } from "@mui/material";
import { useStyles } from "./articles.style";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { contexts } from "../../contexts";
import { useNavigate } from "react-router-dom";
import Helmet from "react-helmet";


const Articles = () => {
  const navigate = useNavigate();



  const { articles } = useContext(contexts);
  const classes = useStyles();
  return (
    <>
      <Container>
        <Helmet>
          <title>articles page</title>
        </Helmet>
        <Grid
          sx={{ marginTop: "3rem" }}
          spacing={3}
          container
          className={classes.root}
        >
          {articles.map((article) => (
            <CardArticles
              onClick={() => {
                navigate(`/article/${article.normalName}`);
              }}
              key={article.id}
              title={article.title}
              summary={article.summary}
              img={article.img}
              fullArticle={article.fullArticle}
              icon={<FavoriteIcon />}
              icon1={<ShareIcon />}
            />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Articles;
