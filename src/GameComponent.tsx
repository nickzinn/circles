import React from 'react';
import './GameComponent.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { PauseCircleOutline, PlayCircleOutline, Refresh } from '@material-ui/icons';
import { BouncingBall } from './sample/BouncingBall';
import { GameController} from './gamelib/GameController';
import { CircularProgress, createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import InfoDialog from './InfoDialog';

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  controlButton: {
  },
  score: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

interface Props extends WithStyles<typeof styles> {
}

interface IState{
  score:number;
  imagesLoaded:boolean;
  pause:boolean;
}

const GameComponent = withStyles(styles)( class extends React.Component<Props> {
 
  canvasRef = React.createRef<HTMLCanvasElement>();
  gameController:GameController;
  state:IState;

  constructor(props:Props){
    super(props);
    this.gameController= new GameController(new BouncingBall());
    this.state = { score:0, imagesLoaded:false, pause:false};
  }
  componentDidMount() { 
    const canvas = this.canvasRef.current;
    this.gameController.init(canvas!, () => this.setState({ imagesLoaded:true }));
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
  componentWillUnmount(){
    this.gameController.isShutdown = true;
  }
  render() {
    const { classes } = this.props;
    return (
    <React.Fragment>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <InfoDialog></InfoDialog>
          <Typography variant="h6" color="primary" className={classes.title}>
            Circles
          </Typography>
          <Typography variant="h6" color="primary" className={classes.score}>
            Score: {this.state.score}
          </Typography>
          <IconButton edge="start" className={classes.controlButton} onClick={(e) => this.handlePause(e)} color="primary" aria-label="menu">
              {this.state.pause ? <PlayCircleOutline /> : <PauseCircleOutline />}
          </IconButton>
          <IconButton edge="start" className={classes.controlButton} onClick={(e) => this.handleRestart(e)} color="primary" aria-label="menu">
            <Refresh />
          </IconButton>
        </Toolbar>
      </AppBar>
      {!this.state.imagesLoaded &&
                <React.Fragment>
                    <Typography variant="h2" gutterBottom>
                    Loading images...
                    </Typography>
                    <CircularProgress />
                    </React.Fragment>        
                }
            <canvas id='Canvas' ref={this.canvasRef} />
    </React.Fragment>
  );
  }
});

export  default GameComponent;