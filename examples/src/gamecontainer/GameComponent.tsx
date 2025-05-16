import React from 'react';
import { Link } from "react-router-dom";
import './GameComponent.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { PauseCircleOutline, PlayCircleOutline, Refresh, VolumeUp, VolumeOff } from '@material-ui/icons';
import { GameController} from 'gamelib';
import { CircularProgress, createStyles, Theme, WithStyles, withStyles, Backdrop, Button } from '@material-ui/core';
import InfoDialog from './InfoDialog';
import { GameInitializer } from 'gamelib';

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  homeButton: {
    textTransform: 'none',
  },
  controlButton: {
  },
  score: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});

interface Props<T extends GameInitializer<T>> extends WithStyles<typeof styles> {
  gameInitializer:T;
}

interface IState{
  score:number;
  imagesLoaded:boolean;
  pause:boolean;
  mute:boolean;
}

const GameComponent = withStyles(styles)( class <T extends GameInitializer<T>> extends React.Component<Props<T>> {
 
  canvasRef = React.createRef<HTMLCanvasElement>();
  gameController:GameController<T>;
  state:IState;

  constructor(props:Props<T>){
    super(props);
    this.gameController= new GameController<T>(props.gameInitializer);
    //this.gameController.debug = true;
    this.state = { score:0, imagesLoaded:false, pause:false, mute:false};
  }
  componentDidMount() { 
    const canvas = this.canvasRef.current;
    this.gameController.init(canvas!, () => this.setState({ imagesLoaded:true }));
    this.gameController.subscribeEvent( (e) => {
      if(e.type === 'score')
        this.setState({score:e.value});
    })
  }
  handleRestart(e:React.MouseEvent) {
    e.stopPropagation();
    this.gameController.restart();
  }
  handlePause(e:React.MouseEvent) {
    e.stopPropagation();
    this.gameController.pause = !this.gameController.pause;
    this.setState({pause: this.gameController.pause});
  }
  handleMute(e:React.MouseEvent) {
    e.stopPropagation();
    this.gameController.mute = !this.gameController.mute;
    this.setState({mute: this.gameController.mute});  
  }
  componentWillUnmount(){
    this.gameController.isShutdown = true;
  }
  render() {
    const { classes } = this.props;
    return (
    <React.Fragment>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar variant="dense">
          <InfoDialog></InfoDialog>
          <Button component={Link} to="/" className={classes.homeButton} >
          <Typography variant="h5" color="primary"   className={classes.title}>
          Circles
          </Typography>
          </Button>
          <Typography variant="h5" color="primary" className={classes.title}>
            &nbsp;
          </Typography>
          <Typography variant="h5" color="primary" className={classes.score}>
            Score: {this.state.score}
          </Typography>
          <IconButton edge="start" className={classes.controlButton} onClick={(e) => this.handlePause(e)} color="primary" aria-label="menu">
              {this.state.pause ? <PlayCircleOutline /> : <PauseCircleOutline />}
          </IconButton>
          <IconButton edge="start" className={classes.controlButton} onClick={(e) => this.handleRestart(e)} color="primary" aria-label="menu">
            <Refresh />
          </IconButton>
          <IconButton edge="start" className={classes.controlButton} onClick={(e) => this.handleMute(e)} color="primary" aria-label="menu">
              {this.state.mute ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Backdrop className={classes.backdrop} open={!this.state.imagesLoaded } >
          <CircularProgress color="inherit" />
      </Backdrop>
      <canvas id='Canvas' ref={this.canvasRef} />
    </React.Fragment>
  );
  }
});

export  default GameComponent;