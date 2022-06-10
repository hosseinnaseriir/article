import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useStyles } from "./home.style";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { HomeCard } from "./../../components/HomeCard/index";
import { useCookies } from "react-cookie";
import { Helmet } from "react-helmet";

export const Home = () => {
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies("token");

  return (
    <Box className={classes.root}>
      <Helmet>
        <meta name="description" content="BOUT THIS PAGE " />
        <title>react home page here ...</title>
      </Helmet>
      <Container>
        <Box className={classes.homeContainer}>
          {cookies.token ? (
            <HomeCard
              onClick={() => {
                removeCookie("token");
                window.location.reload();
              }}
              icon={<LogoutIcon />}
              title="LogOut"
            />
          ) : (
            <HomeCard
              href="/signup"
              icon={<VerifiedUserIcon />}
              title="Login"
            />
          )}
          <HomeCard
            href="/articles-file"
            icon={<AssignmentIcon />}
            title="Articles"
          />
          <HomeCard
            href={cookies.token ? "/add-articles" : "/signup"}
            icon={<DriveFileRenameOutlineIcon />}
            title="AddArticles"
          />
        </Box>
      </Container>
    </Box>
  );
};
