import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import FileBase64 from 'react-file-base64';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "80px",
    margin: "auto",
    padding: theme.spacing(7),
    maxWidth: "400px",
  },

  form: {
    textAlign: "center",
  },
}));

const AddMemory = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  //once you click login you should move inside the application for that,


  //handle state of text field;
  const [inputs, setInputs] = useState({
    tittle: "",
    description: "",
    imageURL: "",
  });

  //this function will be having text fields inside it, we will just change the values acc to their identifiers.
  const handleChange = (e) => {
    // const base64 = await convertToBase64(e.target.name);
    // console.log(base64)
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]:e.target.value,
    }));
  };
  
  
  


  //sending Request to backend
  const sendRequest = async ()=>{
    // console.log(inputs.imageURL);
    const res = await axios.post("http://localhost:5000/api/memories/add", {
      tittle:inputs.tittle,
      description:inputs.description,
      image:inputs.imageURL,
      creator: localStorage.getItem("userId")
    }).catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }


  //handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    sendRequest().then((data)=>console.log(data)).then(()=>navigate('/mymemories'));
  };

  return (
    <Paper className={classes.paper} elevation={3}>
      <form
        onSubmit={handleSubmit}
        className={classes.form}
        autoComplete="off"
        noValidate
      >
        <Typography variant="h6">Add your Memory</Typography>

        <TextField
          name="tittle"
          value={inputs.tittle}
          onChange={handleChange}
          variant="outlined"
          label="Add Tittle: "
          margin="normal"
          fullWidth
        />

        <textarea
          name="description"
          value={inputs.description}
          onChange={handleChange}
          variant="outlined"
          label="Add Description: "
          type={"text"}
          minRows={4}
          margin="normal"
          fullWidth
        />
        {/* <TextField
          name="imageURL"
          value={inputs.imageURL}
          onChange={handleChange}
          variant="outlined"
          label="Add Image: "
          // type={"image"}
          // minRows={4}
          margin="normal"
          fullWidth
        /> */}
        <FileBase64
          name="imageURL"
          value={inputs.imageURL}
          onDone={({ base64 }) =>
            setInputs({ ...inputs, imageURL: base64 })
          }
          type="file"
          accept=".jpeg, .png, .jpg"
          label="Image URL: "
          style={{ fontSize: "17px", marginTop: "25px" }}
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
      </form>
    </Paper>
  );
};

export default AddMemory;
