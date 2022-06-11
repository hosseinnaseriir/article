import {
  Button,
  Container,
  FormGroup,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useStyles } from "./auth.style";
// import formik for handle form validations
import { Formik } from "formik";
// import yup for set pattern or schema for form validations
import * as Yup from "yup";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { contexts } from "./../../contexts/index";

const Auth = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { setLoader } = useContext(contexts);

  const [cookies, setCookie, removeCookie] = useCookies("token");

  // create new schma or pattern for form validation
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email("emailet eshtebaheee!")
      .required("lotafan emailet roo vared kon"),
    password: Yup.string()
      .required("password yadet raft !")
      .min(3, "teedadesh kamtar az 3 ta nabashe")
      .max(255, "teedadesh bishtar az 6 ta nabashe"),
  });

  return (
    <Container>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={6}>
          <Typography my={5} variant="h3">
            Login For Enjoy ...
          </Typography>
          {/* use formik for handle our Form JSX */}
          <Formik
            // what is initial value of fields in your form (email and password)
            initialValues={{ email: "", password: "" }}
            // what is your yup Schema for this form
            validationSchema={formSchema}
            // what happend if form submitting
            onSubmit={async (values) => {
              try {
                setLoader(true);
                const res = await axios.post(
                  "https://reqres.in/api/login",
                  values
                );
                setCookie("token", res.data.token, {
                  maxAge: 60 * 60 * 24, // 1Day
                });
                localStorage.setItem("user", values.email);
                setLoader(false);
                navigate("/");
              } catch (ex) {
                setLoader(false);
                toast.warn("somethin wrong ! check email or password !");
              }
            }}
          >
            {/* for handle our form we have to pass a function to our formik Component Children -> {(handler)=>{<form></form>}} */}
            {(handlers) => (
              <Box component="form" onSubmit={handlers.handleSubmit}>
                <FormGroup className={classes.formGroup}>
                  {handlers.errors.email}
                  <TextField
                    placeholder="Enter Your Email..."
                    variant="outlined"
                    type="email"
                    name="email"
                    onChange={handlers.handleChange}
                    onBlur={handlers.handleBlur}
                    // value is our initial values key
                    value={handlers.values.email}
                  ></TextField>
                  {handlers.errors.password}
                  <TextField
                    placeholder="Enter Your Password..."
                    variant="outlined"
                    type="password"
                    name="password"
                    onChange={handlers.handleChange}
                    onBlur={handlers.handleBlur}
                    value={handlers.values.password}
                  ></TextField>
                  <Button
                    // we have to check -> type of our button -> submit
                    type="submit"
                    className=""
                    variant="contained"
                    size="large"
                  >
                    Submit
                  </Button>
                </FormGroup>
              </Box>
            )}
          </Formik>
        </Grid>

        <Grid className={classes.authIcon} item xs={6}>
          <VpnKeyIcon />
        </Grid>
      </Grid>
    </Container>
  );
};
export default Auth;
