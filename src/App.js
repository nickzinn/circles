import React,  { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CirclesGame from './CirclesGame';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  score: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function App() {
  
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);

  // const handleCanvasClick=(event)=>{
  //   // on each click get current mouse location 
  //   const rect = canvasRef.current.getBoundingClientRect()

  //   const currentCoord = { x: event.clientX - rect.left, y: event.clientY - rect.top};
  //   // add the newest mouse location to an array in state 
  //   setCoordinates([...coordinates, currentCoord]);
  // };

  const classes = useStyles();

  function handleRestart(e) {
    e.e.stopPropagation();
    canvasRef.current.action("restart"); 
  }

  return (
    <React.Fragment>
    <CirclesGame ref={canvasRef} setScore={setScore}/>
    <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
      <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" color="primary"  className={classes.title}>
      Circles
    </Typography>
    <Typography variant="h6" color="primary"  className={classes.score}>
      Score: {score}
    </Typography>
    <Button variant="outlined" color="primary" onClick={handleRestart }> Restart Game</Button>
      </Toolbar>
    </AppBar>
    </React.Fragment>
  );

}

export default App;