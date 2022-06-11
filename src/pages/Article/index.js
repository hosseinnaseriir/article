import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardMedia,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useLocation } from "react-router-dom";
import { contexts } from "../../contexts";
import Helmet from "react-helmet";
import parse from "html-react-parser";
import { Box } from "@mui/system";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

function Article() {
  const { articles, setArticles } = useContext(contexts);

  const [cookie] = useCookies("token");

  const location = useLocation();
  const pathNormalName = location.pathname.slice(9);
  const [currentArticle, setCurrentArticle] = useState({});
  const [comment, setComment] = useState("");

  useEffect(() => {
    const actualArticle = articles.filter(
      (article) => article.normalName === pathNormalName
    );
    setCurrentArticle(actualArticle[0]);
  }, []);

  console.log(cookie);
  const handleLikeArticle = () => {
    const updatedArrticles = articles.map((article) => {
      if (article.normalName === pathNormalName) {
        const likedArticle = {
          ...article,
          like: article.like + 1,
          youlike: true,
        };
        setCurrentArticle(likedArticle);
        return likedArticle;
      } else {
        return article;
      }
    });
    setArticles(updatedArrticles);
  };

  const handleAddcomment = () => {
    if (!cookie.token)
      return toast.warn("you must be logged in to add comment");
    if (!comment) return toast.warn("you must type somethin to sen comment ");
    const newComment = {
      name: localStorage.getItem("user") || "unknown user ...",
      comment,
    };
    const updatedArrticles = articles.map((article) => {
      if (article.normalName === pathNormalName) {
        const commentedArticle = {
          ...article,
          comments: [...article.comments, newComment],
        };
        setCurrentArticle(commentedArticle);
        return commentedArticle;
      } else {
        return article;
      }
    });
    setArticles(updatedArrticles);
    setComment("");
  };

  console.log(currentArticle.comments);

  return (
    <>
      <Helmet>
        <meta name="keywords" content={currentArticle?.tags} />
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
            <hr />
            {parse(currentArticle.article || " ")}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {currentArticle.youlike ? (
            <IconButton aria-label="add to favorites">
              <FavoriteIcon sx={{ fill: "tomato" }} />
              {currentArticle.like}
            </IconButton>
          ) : (
            <IconButton
              onClick={handleLikeArticle}
              aria-label="add to favorites"
            >
              <FavoriteIcon />
              {currentArticle.like}
            </IconButton>
          )}
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      <FormGroup>
        <TextField
          placeholder="Enter Your comment..."
          variant="outlined"
          type="text"
          name="title"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></TextField>
        <Button variant="contained" onClick={handleAddcomment}>
          SEND
        </Button>
      </FormGroup>

      <hr />
      <Box p={2}>
        {currentArticle?.comments?.map((comment) => (
          <Box>
            <Typography variant="h3">{comment.name}</Typography>
            <Typography>{comment.comment}</Typography>
            <hr />
          </Box>
        ))}
      </Box>
    </>
  );
}

export default Article;
