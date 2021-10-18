import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(9),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    marginTop: theme.spacing(9),
    minWidth: 440,
  },
  marginTop: {
    marginTop: "3px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  padding: {
    padding: "5px",
  },
}));

const Index = () => {
  const classes = useStyles();
  const [userMsg, setUserMsg] = useState({
    newTask: "",
  });
  const [notesDataLocal, setNotesDataLocal] = useState([]);
  const [userTask, setUserTask] = useState([]);
  const [userBtn, setUserBtn] = useState(false);
  const [userId, setUserId] = useState(null);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    var id = new Date().getTime().toString();
    setUserMsg({ ...userMsg, [name]: value, id: id });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (!userMsg.newTask) {
      console.log("hello");
    } else if (userBtn) {
      console.log("kdkskdkn");
      var userMsgData = JSON.parse(localStorage.getItem("userMsg"));
      userMsgData.map((ele, i) => {
        if (ele.id == userId) {
          return { ...ele, name: userMsg.newTask };
        }
        return ele;
      });
    } else {
      var userMsgData = JSON.parse(localStorage.getItem("userMsg"));
      console.log(userMsgData, "localStorage");
      if (!Array.isArray(userMsgData)) {
        userMsgData = [];
      }
      userMsgData.push(userMsg);
      localStorage.setItem("userMsg", JSON.stringify(userMsgData));
      setUserTask(userMsgData);
      setUserMsg({
        newTask: "",
      });
    }
  };

  const handleDelete = (i) => {
    console.log(i);
    var userMsgData = JSON.parse(localStorage.getItem("userMsg"));
    userMsgData.splice(i, 1);
    localStorage.setItem("userMsg", JSON.stringify(userMsgData));
    setNotesDataLocal(userMsgData);
    setUserTask(userMsgData);
  };

  const handleEdit = (id) => {
    console.log(id);
    var userMsgData = JSON.parse(localStorage.getItem("userMsg"));
    var data = userMsgData.find((ele) => {
      return ele.id === id;
    });
    setUserMsg({
      newTask: data.newTask,
    });
    setUserBtn(true);
    setUserId(id);
    console.log(data.newTask);
  };

  useEffect(() => {
    var userMsgData = JSON.parse(localStorage.getItem("userMsg"));
    setUserTask(userMsgData);
    console.log(userMsg.newTask, "efwf");
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <div className={`${classes.paper} ${classes.marginTop}`}>
            <Typography component="h1" variant="h5">
              Create Task
            </Typography>
            <form className={classes.form} onSubmit={HandleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    value={userMsg.newTask}
                    id="newTask"
                    label="New Task"
                    name="newTask"
                    autoComplete="newTask"
                    onChange={HandleChange}
                  />
                </Grid>
              </Grid>
              {userBtn ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Edit Task
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Add Task
                </Button>
              )}
            </form>
          </div>
        </CardContent>
      </Card>
      {Array.isArray(userTask) &&
        userTask.map((value, i) => {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid black",
                margin: "5px 0px",
                width: "100%",
              }}
              className={classes.root}
            >
              <h2
                style={{
                  textAlign: "center",
                  margin: "15px 5px",

                  padding: "0px 5px",
                  flexGrow: 2,
                }}
              >
                {value.newTask}
              </h2>
              <span
                style={{
                  margin: "0px 20px 0 0",
                }}
                className={classes.DeleteBtn}
              >
                <DeleteIcon onClick={() => handleDelete(i)} />
                <EditIcon onClick={() => handleEdit(value.id)} />
              </span>
            </div>
          );
        })}
    </Container>
  );
};

export default Index;
