import {
  Button,
  Container,
  FormGroup,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { useStyles } from "./addArticles.style";
import { Formik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { contexts } from "../../contexts";
import { v4 } from "uuid";
import converToBase64 from "./../../utils/convertToBase64";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddArticls = () => {
  const classes = useStyles();
  const [picture, setPicture] = useState("");
  const [article, setArticle] = useState("");
  const [tags, setTags] = useState("");
  const { articles, setArticles } = useContext(contexts);

  const navigate = useNavigate();

  const validateArticleForm = Yup.object().shape({
    title: Yup.string().required(),
    text: Yup.string().required(),
    picture: Yup.mixed().required(),
  });

  const addNewArticle = async (value) => {
    const img = await converToBase64(picture);
    const splitTitle = value.title.split(" ");
    const normalName = splitTitle.join("_");
    const newArticle = {
      id: v4(),
      title: value.title,
      normalName,
      summary: value.text.slice(0, 50),
      fullArticle: value.text,
      article,
      img,
      tags,
      like: 0,
    };
    const articlesList = [...articles, newArticle];
    setArticles(articlesList);
    // window?.localStorage.setItem("articles", JSON.stringify(articlesList));
    toast.success("new article added !");
    navigate("/");
  };

  return (
    <Container>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={8}>
          <Typography my={5} variant="h3">
            Add Article
          </Typography>
          <Formik
            initialValues={{
              title: "",
              picture: "",
              text: "",
            }}
            validationSchema={validateArticleForm}
            onSubmit={addNewArticle}
          >
            {(handlers) => (
              <Box onSubmit={handlers.handleSubmit} component="form">
                <FormGroup className={classes.formGroup}>
                  {handlers.errors.title}
                  <TextField
                    placeholder="Enter Your title..."
                    variant="outlined"
                    type="text"
                    name="title"
                    onChange={handlers.handleChange}
                    onBlur={handlers.handleBlur}
                    value={handlers.values.title}
                  ></TextField>
                  {handlers.errors.picture}
                  <TextField
                    name="picture"
                    onChange={handlers.handleChange}
                    onChangeCapture={(e) => {
                      setPicture(e.target.files[0]);
                    }}
                    onBlur={handlers.handleBlur}
                    value={handlers.values.picture}
                    variant="outlined"
                    type="file"
                  ></TextField>
                  {handlers.errors.text}
                  <TextField
                    placeholder="Enter Your title..."
                    variant="outlined"
                    type="text"
                    name="text"
                    onChange={handlers.handleChange}
                    onBlur={handlers.handleBlur}
                    value={handlers.values.text}
                  ></TextField>

                  <CKEditor
                    editor={ClassicEditor}
                    // config={{
                    //   toolbar: ["bold", "italic"],
                    // }}
                    data="<p>Enter your text!</p>"
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log({ event, editor, data });
                      setArticle(data);
                    }}
                    onBlur={(event, editor) => {
                      console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  />
                  <TextField
                    placeholder="Enter Your tags and put a ',' between each tag..."
                    variant="outlined"
                    type="text"
                    name="text"
                    onChange={(e) => setTags(e.target.value)}
                    value={tags}
                  ></TextField>
                  <Button type="submit" variant="contained" size="large">
                    Submit
                  </Button>
                </FormGroup>
              </Box>
            )}
          </Formik>
        </Grid>

        <Grid className={classes.authIcon} item xs={4}>
          <NewspaperIcon />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddArticls;
