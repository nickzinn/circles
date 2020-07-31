import React, { useRef, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Pause, Info, Refresh } from '@material-ui/icons';

import { BouncingBall } from './sample/BouncingBall';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  infoButton: {
    marginRight: theme.spacing(1),
  },
  controlButton: {

  },
  score: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {

  const gameRef = useRef(null);
  const [score, setScore] = useState(0);

  const classes = useStyles();

  function handleRestart(e) {
    e.stopPropagation();
    //canvasRef.current.action("restart"); 
  }
  function handlePause(e) {
    e.stopPropagation();
    //canvasRef.current.action("restart"); 
  }
  return (
    <React.Fragment>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton edge="start" className={classes.infoButton} color="primary" aria-label="menu">
            <Info />
          </IconButton>
          <Typography variant="h6" color="primary" className={classes.title}>
            Circles
          </Typography>
          <Typography variant="h6" color="primary" className={classes.score}>
            Score: {score}
          </Typography>
          <IconButton edge="start" className={classes.controlButton} onClick={handlePause} color="primary" aria-label="menu">
            <Pause />
          </IconButton>
          <IconButton edge="start" className={classes.controlButton} onClick={handleRestart} color="primary" aria-label="menu">
            <Refresh />
          </IconButton>
        </Toolbar>
      </AppBar>
      <BouncingBall></BouncingBall>
    </React.Fragment>
  );

}

export default App;