import { Button, Paper, TextField, Typography, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import FileBase64 from "react-file-base64";


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



const Memorydetail = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const id = useParams().id;
  const [memory, setMemory] = useState();
  //handle state of text field;
  const [inputs, setInputs] = useState({});
  console.log(id);



  //this function will be having text fields inside it, we will just change the values acc to their identifiers.
  const handleChange = (e) => {
    // const base64 = await convertToBase64(e.target.name);
    // console.log(base64)
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/memories/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    // console.log(data);
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setMemory(data.memory)
      setInputs({
        tittle: data.memory.tittle,
        description: data.memory.description,
      });
    });
  }, [id]);
  // console.log(memory);
  // console.log( inputs);



  //sending Request to backend to update
  const sendRequest = async()=>{
    const res = await axios.put(`http://localhost:5000/api/memories/update/${id}`, {
      tittle:inputs.tittle,
      description:inputs.description,
    }).catch((err)=>console.log(err));
    
    // console.log(res);
    const data = await res.data;
    return data;
  }



  //handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    sendRequest().then((data)=>console.log(data)).then(()=>navigate("/mymemories"));
 
  };

  return (
    <div>
    {inputs &&
      <Paper className={classes.paper} elevation={3}>
        <form
          onSubmit={handleSubmit}
          className={classes.form}
          autoComplete="off"
          noValidate
        >
          <Typography variant="h6">Edit your Memory</Typography>

          <TextField
            name="tittle"
            value={inputs.tittle}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            label="title"
            fullWidth
          />

          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            variant="outlined"
            type={"text"}
            minRows={4}
            margin="normal"
            label="Description"
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
        </form>
      </Paper>
    }
    </div>
  );
}

export default Memorydetail