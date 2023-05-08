import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper, makeStyles } from "@material-ui/core";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../store/AuthContextProvider';
import { GoogleOAuthProvider } from "@react-oauth/google";
import {GoogleLogin} from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import {Helmet} from 'react-helmet';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "80px",
    margin:"auto",
    padding: theme.spacing(7),
    maxWidth:"400px"
  },

  form: {
    textAlign:"center",
  },
}));

const Auth = () => {
  const classes = useStyles();
  //once you click login you should move inside the application for that,
  // const dispatch = useDispatch();
  const { getIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();


  const [isSignup, setIsSignup]=useState(false);
  //handle state of text field;
  const [inputs,setInputs] = useState({
    name:"", email:"", password:""
  })
   
  //this function will be having text fields inside it, we will just change the values acc to their identifiers.
  const handleChange= (e) =>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  const sendRequest = async(type="login") =>{
    const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
      name:inputs.name,
      email:inputs.email,
      password:inputs.password
    }).catch((err)=>alert(JSON.stringify(err.response.data)));

    const data = await res.data;
   
    // console.log(data.user);
    console.log(data);
    return data;
  }



  //handling form submission
  const handleSubmit=(e)=>{
    e.preventDefault();//prevent page reload, you dont want page to reload when submit is hit
   
    if(isSignup){
      if(inputs.name==''||inputs.email==''||inputs.password==''){
        alert("Fill up the required data");
      }else{
      sendRequest("signup")
        .then(() => navigate("/auth"))
        .then(()=>alert("SignUp Successful.. Please Login"))
        .then((data) => console.log(data));
        setIsSignup(!isSignup);
      }
      // {alert("Signup Successful")}
    }else{
      if ( inputs.email == "" || inputs.password == "") {
        alert("Fill up the required data");
      }
      else{
        sendRequest()
          .then((data)=>localStorage.setItem("Access Token: ", data.accessToken))
          // .then((data)=>localStorage.setItem("userId", data.user._id))
          .then(()=>getIsLoggedIn())
          .then(()=>navigate('/memories'))
          .then(()=>{alert("Login Successful...")})
          // .then(data=>console.log(data));
        }
      }
  }

  const changeAuth=()=>{
    // console.log(isSignup);
    if(isSignup===false){
      setIsSignup(true);
    }else{
      setIsSignup(false);
    }
  }

   

  return (
    <Paper className={classes.paper} elevation={3}>
      <form
        onSubmit={handleSubmit}
        className={classes.form}
        autoComplete="off"
        noValidate
      >
        <Typography variant="h6">{isSignup ? "SignUp" : "Login"}</Typography>
        {isSignup && (
          <TextField
            name="name"
            value={inputs.name}
            onChange={handleChange}
            variant="outlined"
            label="Enter your name: "
            margin="normal"
            required
            fullWidth
          />
        )}
        <TextField
          name="email"
          value={inputs.email}
          onChange={handleChange}
          variant="outlined"
          label="Enter email id: "
          type={"email"}
          margin="normal"
          required
          fullWidth
        />
        <TextField
          name="password"
          value={inputs.password}
          onChange={handleChange}
          variant="outlined"
          label="Password"
          type={"password"}
          margin="normal"
          required
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          style={{ marginTop: "15px", marginRight: "15px" }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ marginTop: "15px" }}
        >
          Clear
        </Button>
        <Button
          onClick={changeAuth}
          variant="outlined"
          color="primary"
          size="large"
          style={{ display: "block", margin: "25px auto", width: "215px" }}
        >
          Change to {isSignup ? "Login" : "SignUp"}
        </Button>
        <div style={{ display: "flex", justifyContent:"center", alignItems:"center"}}>
          <GoogleOAuthProvider clientId="462973834104-cls13o9m22h2enerrmci1sn3so81e27e.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const details = jwt_decode(credentialResponse.credential);
                console.log(details);
                getIsLoggedIn();
                navigate('/memories');
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        </div>
      </form>
    </Paper>
  );
}

export default Auth;

