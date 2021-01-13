import React, { useState, useEffect } from "react";
import SongShow from "./SongShow";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary,
  },
  // list: {
  //   width: "100%",
  //   maxWidth: 360,
  //   backgroundColor: theme.palette.background.paper,
  // },
}));

function SongIndex() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [songs, setSongs] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    fetch("http://localhost:3000/api/songs")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setSongs(result);
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Paper variant="outlined" square className={classes.paper}>
              <List
                component="nav"
                className={classes.list}
                aria-label="mailbox folders"
              >
                {songs.map((song) => (
                  <div key={song.id}>
                    <ListItem button>
                      <ListItemText
                        to={`/songs/${song.id}`}
                        primary={song.title}
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Paper variant="outlined" square className={classes.paper}>
              <SongShow />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SongIndex;
