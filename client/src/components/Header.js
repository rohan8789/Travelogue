import React, { useState, useContext} from 'react';
import {
  Container,
  AppBar,
  Typography,
  Box,
  Button,
  Toolbar,
  Tabs,
  Tab,
} from "@material-ui/core";
import useStyles from "../styles.js";
import eye2 from "../image/eye2.jpg";
import { Link } from 'react-router-dom';
import AuthContext from "../store/AuthContextProvider";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const {isLoggedIn, getIsLoggedIn } = useContext(AuthContext);
  // console.log("isLoggedIn: " + isLoggedIn);
  const navigate = useNavigate();
  const logoutFn = async()=>{
    await axios.get("http://localhost:5000/api/user/logout");
    getIsLoggedIn();
    navigate('/Auth');
  }
  const [value, setValue]=useState("0");
  const classes = useStyles();
  return (
    <Container maxWidth="xl">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Toolbar>
          <Typography className={classes.heading} variant="h4">
            Memories
          </Typography>
          <img
            className={classes.image}
            src={eye2}
            alt="memories"
            height="45"
          ></img>
          {isLoggedIn === true && (
            <Box style={{ display: "flex", marginLeft: "auto" }}>
              <Tabs value={value} onChange={(e, val) => setValue(val)} textColor='inherit'>
                <Tab value="0" component={Link} to="/memories" label="All Memories"/>
                <Tab value="1" component={Link} to="/mymemories" label="My Memories"/>
                <Tab value="2" component={Link} to="/memories/add" label="Add Memories"/>
              </Tabs>
            </Box>
          )}
          <Box className={classes.box}>
            {isLoggedIn === false && (
              <>
                <Button
                  component={Link}
                  to="/Auth"
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "10px" }}
                  buttonText="primary"
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/Auth"
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  buttonText="primary"
                >
                  SignUp
                </Button>
              </>
            )}

            {isLoggedIn === true && (
              <Button
                onClick={logoutFn}
                component={Link}
                to="/Auth"
                className={classes.btn}
                variant="contained"
                color="primary"
                buttonText="primary"
                style={{ marginLeft: "10px" }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default Header