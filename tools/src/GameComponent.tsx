import React from 'react';
import './GameComponent.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import { GameController } from 'gamelib';
import { CircularProgress, Backdrop, Button } from '@mui/material';
import { GameInitializer } from 'gamelib';
import Info from '@mui/icons-material/Info';

interface Props<T extends GameInitializer> {
  gameInitializer: T;
}

interface IState {
  score: number;
  imagesLoaded: boolean;
  pause: boolean;
  mute: boolean;
}

class GameComponentClass<T extends GameInitializer> extends React.Component<Props<T>, IState> {
  canvasRef = React.createRef<HTMLCanvasElement>();
  gameController: GameController;

  constructor(props: Props<T>) {
    super(props);
    this.gameController = new GameController(props.gameInitializer);
    this.gameController.debug = true;
    this.state = { score: 0, imagesLoaded: false, pause: false, mute: false };
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    this.gameController.init(canvas!, () => this.setState({ imagesLoaded: true }));
    this.gameController.subscribeEvent((e) => {
      if (e.type === 'score')
        this.setState({ score: e.value });
    });
    console.log('GameComponent mounted');
  }

  handleRestart(e: React.MouseEvent) {
    e.stopPropagation();
    this.gameController.restart();
  }

  handlePause(e: React.MouseEvent) {
    e.stopPropagation();
    this.gameController.pause = !this.gameController.pause;
    this.setState({ pause: this.gameController.pause });
  }

  handleMute(e: React.MouseEvent) {
    e.stopPropagation();
    this.gameController.mute = !this.gameController.mute;
    this.setState({ mute: this.gameController.mute });
  }

  componentWillUnmount() {
    this.gameController.shutdown();
    console.log('GameComponent unmounted');
  }

  render() {
    return (
      <React.Fragment>
        <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none' }}>
          <Toolbar variant="dense">
            <IconButton edge="start" href='\about' sx={{textTransform: 'none'}} color="primary" aria-label="menu">
              <Info />
            </IconButton>
            <Button 
              href="/" 
              sx={{ textTransform: 'none' }}
            >
              <Typography variant="h5" color="primary" sx={{ flexGrow: 1 }}>
                Circles
              </Typography>
            </Button>
            <Typography variant="h5" color="primary" sx={{ flexGrow: 1 }}>
              &nbsp;
            </Typography>
            <Typography variant="h5" color="primary" sx={{ mr: 1 }}>
              Score: {this.state.score}
            </Typography>
            <IconButton 
              edge="start" 
              onClick={(e) => this.handlePause(e)} 
              color="primary" 
              aria-label="menu"
            >
              {this.state.pause ? <PlayCircleOutlineIcon /> : <PauseCircleOutlineIcon />}
            </IconButton>
            <IconButton 
              edge="start" 
              onClick={(e) => this.handleRestart(e)} 
              color="primary" 
              aria-label="menu"
            >
              <RefreshIcon />
            </IconButton>
            <IconButton 
              edge="start" 
              onClick={(e) => this.handleMute(e)} 
              color="primary" 
              aria-label="menu"
            >
              {this.state.mute ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Backdrop 
          sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            color: '#fff',
          }} 
          open={!this.state.imagesLoaded}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <canvas id='Canvas' ref={this.canvasRef} />
      </React.Fragment>
    );
  }
}

// Export without using withStyles
const GameComponent = <T extends GameInitializer>(props: Props<T>) => (
  <GameComponentClass {...props} />
);

export default GameComponent;