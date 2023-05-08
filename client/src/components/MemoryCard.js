import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
  },
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    position: "relative",
    width: "50%",
    margin: "auto",
    marginTop: "7%",
    borderRadius: "10px",
    boxShadow: "2px 2px 20px #ccc",
    cursor: "pointer",
    "&:hover": { boxShadow: "14px 14px 40px #ccc" },
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  },
  title: {
    padding: "0 16px",
  },
  cardActions: {
    // padding: "0px 0px 0px 0px",
    display: "flex",
    // justifyContent: "space-between",
  },
});

const MemoryCard = ({
  tittle,
  description,
  imageURL,
  userName,
  isUser,
  id,
}) => {
  const classes = useStyles();
  // console.log(tittle+" "+ isUser+" "+userName);
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/mymemories/${id}`);
  };

  // console.log(id);
  const DeleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/memories/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    // console.log(data);
    return data;
  };

  const handleDelete =(e) => {
    DeleteRequest().then(()=>navigate('/memories')).then(()=>navigate('/mymemories'));
  };
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={imageURL} title={tittle} />
        <div className={classes.overlay}>
          <Typography variant="h6">{userName}</Typography>
          <Typography variant="body2">
            Date
            {/* {moment(post.createdAt).fromNow()} */}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            // onClick={() => setCurrentId(post._id)}
            >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
        <br/>
        <hr/><hr/>
        {/* <br/> */}
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
          >
          {tittle}
        </Typography>
        <hr/><hr/>
        <br/>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <b>{userName + ": "}</b>
            {description}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            // onClick={() => dispatch(likePost(post._id))}
          >
            <ThumbUpAltIcon fontSize="large" /> Like {/*post.likeCount*/}{" "}
          </Button>
          <Button onClick={handleEdit} style={{ marginLeft: "auto" }}>
            {isUser && <EditIcon fontSize="large" />}
          </Button>
          <Button onClick={handleDelete}>
            {isUser && <DeleteIcon fontSize="large" />}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default MemoryCard;
