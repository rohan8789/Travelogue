import { Button, makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  appBar: {
    borderRadius: 12,
    margin: "30px 0",
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent:'center',
    // alignItems:'center',
  },
  box: {
    display: "flex",
    marginLeft: "auto",
    justifyContent: "space-around",
},
heading: {
    color: "rgba(0,183,255,1)",
},
image: {
    marginLeft: "10px",
},
}));